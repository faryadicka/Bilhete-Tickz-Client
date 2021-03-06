//next Component
import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//localcomponent
import LayoutLoggedIn from '../components/LayoutLoggedIn/LayoutLoggedIn';
//cssmodule
import styles from '../styles/Home.module.css';
//assets
import Header from '../assets/img/headerImage.png';
// import Card from '../assets/img/Card.png';
import NowShowingCard from '../components/NowShowingCard';
import UpcomingCard from '../components/UpcomingMoviesCard';
// Axios
// import { getNowShowingMoviesAxios, getUpcomingMoviesAxios } from '../modules/movies';
// import axios from 'axios';

export async function getServerSideProps() {
   const nowShow = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/movies/nowshow?page=1&limit=5`);
   const upComing = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/movies/upcoming?page=1&limit=5`);

   const dataNowShow = await nowShow.json();
   const dataUpComing = await upComing.json();

   return {
      props: {
         dataNowShow,
         dataUpComing,
      },
   };
}

const Home = ({ dataNowShow, dataUpComing }) => {
   // const { loginData } = useSelector((state) => state.auth);
   //  const [movies, setMovies] = useState([]);
   //  const [upMovies, setUpMovies] = useState([]);
   //  const [errMsg, setErrMsg] = useState('');
   const router = useRouter();
   //  const dispatch = useDispatch();

   //  useEffect(() => {
   //     getNowShowingMoviesAxios()
   //        .then((res) => {
   //           console.log(res);
   //           setMovies(res.data?.data);
   //        })
   //        .catch((err) => {
   //           console.log(err);
   //           setErrMsg(err.response?.data.msg);
   //        });
   //     getUpcomingMoviesAxios()
   //        .then((res) => {
   //           console.log(res);
   //           setUpMovies(res.data?.data);
   //        })
   //        .catch((err) => {
   //           console.log(err);
   //           setErrMsg(err.response?.data.msg);
   //        });
   //  }, []);

   return (
      <LayoutLoggedIn title="Home">
         <header className="d-flex flex-column flex-md-row justify-content-center py-5 align-items-center">
            <div className={`${styles.textHeader} ps-md-4 text-center text-md-start col-md-5 mb-5 mb-md-0`}>
               <p>Nearest Cinema, Newest Movie.</p>
               <h1>Find out now!</h1>
            </div>
            <div className="col-md-5 text-center">
               <Image src={Header} alt="header" />
            </div>
         </header>
         <main className={styles.containerHome}>
            <div className={`d-flex justify-content-between px-5 align-items-center`}>
               <h4 className={styles.headerNow}>Now Showing</h4>
               <p
                  onClick={() => {
                     router.push('/movies/nowshowing?page=1');
                  }}
                  className={`${styles.clickAble} text-primary`}
               >
                  view all
               </p>
            </div>
            <div className={`d-flex justify-content-start my-5 mx-5 gap-4 flex-md-row`}>{dataNowShow.data.length === 0 ? <div>Loading..</div> : dataNowShow.data.map((item) => <NowShowingCard name={item.name} key={item.id} id={item.id} image={item.img} />)}</div>
            <div className={`d-flex justify-content-between px-5 align-items-center ${styles.UpcomingRow}`}>
               <h4>Upcoming Movies</h4>
               <p
                  onClick={() => {
                     router.push('/movies/upcoming?page=1');
                  }}
                  className={`${styles.clickAble} text-primary`}
               >
                  view all
               </p>
            </div>
            <div className="d-flex justify-content-center gap-3 my-5 flex-md-row flex-wrap">
               {/* {month.map((item) => (
            <button key={item.id} className={styles.buttonMonth}>
              {item.month}
            </button>
          ))} */}
            </div>
            <div className="d-flex justify-content-start my-5 mx-5 gap-4 flex-md-row flex-wrap">{dataUpComing.data?.length === 0 ? <div>Loading..</div> : dataUpComing.data?.map((item) => <UpcomingCard name={item.name} key={item.id} id={item.id} image={item.img} />)}</div>
            <div className="container mt-5 text-center">
               <div className={styles.CardMember}>
                  Be the vanguard of the <section>Moviegoers</section> <input type="text" className={`px-3 ${styles.inputMember}`} placeholder="Type your email" />
                  <button className={styles.buttonMember}>Join now</button>
                  <p className={styles.descMember}>
                     By joining you as a Tickitz member, <br />
                     we will always send you the latest updates via email .
                  </p>
               </div>
            </div>
         </main>
      </LayoutLoggedIn>
   );
};

export default Home;
