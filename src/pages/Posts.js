import React, {useState, useEffect, useRef} from 'react';
import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from '../Components/PostList';
import PostForm from '../Components/PostForm';
import PostFilter from '../Components/PostFilter';
import MyModal from '../Components/UI/myModal/MyModal';
import MyButton from '../Components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../Components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../Components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';


function Posts() {

  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const pagesArray = getPagesArray(totalPages);


  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })


  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }


  return(
    <div className="App">
      
        <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)} >
          Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
           <PostForm create={createPost}/>
        </MyModal>

        <hr style={{margin: '15px 0'}} />
        
        <PostFilter
         filter={filter}
         setFilter={setFilter}
        />

      {postError &&
          <h1>Произошла ошибка {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
        <div ref={lastElement}></div>
        {isPostsLoading &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        }
         
         
      
     <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
       
  
     
  </div>
  );
}

export default Posts;
