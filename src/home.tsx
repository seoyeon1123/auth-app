import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>메인화면 입니다.</h1>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </>
  );
};

export default Home;
