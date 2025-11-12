
import React, { useEffect, useState } from "react";
// import CountVectorizer from  'scikit-learn'; 
import { MoreVert } from "@mui/icons-material";
import NavigationMenuProfile from "../../components/sidebar/NavigationProfile";
import Header from '../../components/header/Header';
import jwt_decode from "jwt-decode";
import "./TeamWork.css";
//import initialState from '../../initialStates/userInitialState'

interface Post {
  id: number;
  title: string;
  photo: string;
  url :string;
  type_post: string;
  description : string;
  tag:string;
  crated_at: Date;
  commentaire :string;
  id_user: number;
}

interface User {
  id?: number;
  username: string;
  email: string;
  role: string;
  userphone: string;
  post?: string;
  formations:{
    niveau: string;
    diplome: string;
    date_fin: string;
    date_debut: string;
    specialite: string;
    universite: string;
}[] | {}[];
  projets: {
    title: string;
    language: string;
    description: string;
}[] | {}[];
  skill:string;
}

export default function TeamWork(): any {
  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const user: User = jwt_decode(token!);
  console.log( 'dataUser',user)
  const [postData, setPostData] = useState<Post[]>([]);
  const [userData, setUserData] = useState<User[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/api/v2/posts");
        if (response.ok) {
          const data: Post[] = await response.json();
          setPostData([...data]);
          //console.log("DATAAAA", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response1 = await fetch("http://localhost:5100/api/v1/users");
        if (response1.ok) {
          const dataUser: User[] = await response1.json();
          setUserData([...dataUser]);
         // console.log("DATAAAAUser", dataUser);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);
      

  
      const userList: string[] = [
        user.formations.map((formation) => formation.diplome).join(', ') || '',
        user.formations.map((formation) => formation.specialite).join(', ') || '',
        user.projets.map((projet) => projet.title).join(', ') || '',
        user.projets.map((projet) => projet.language).join(', ') || '',
        user.projets.map((projet) => projet.description).join(', ') || '',
        user.skill || '',
      ];
  
      console.log("DATAAAAUserList", userList);
  
      const wordsArray: string[] = userList
        .flatMap((item) => item.toString().toLowerCase().split(/\s*,\s*|\s+/));
  
      console.log("DATAAAAWordUserList", wordsArray);
      // split All Type Post dans une list
      const PostTypeList: string[] = postData.map(item => item.type_post);
      console.log('PostTypeList',PostTypeList)

      const wordsTypeArray: string[] = PostTypeList
        .flatMap((item) => item.toString().toLowerCase().split(/\s*,\s*|\s+/));
      console.log("DATAAAAWordTypeList", wordsTypeArray);

              
            function countWordOccurrences(wordsArray: string[], targetWords: string[]): Record<string, number> {
              const wordCount: Record<string, number> = {};
          
              // Parcours de la liste de mots
              for (const word of wordsArray) {
                  // Incrémentation du compteur pour chaque mot
                  if (wordCount[word]) {
                      wordCount[word]++;
                  } else {
                      // Initialisation du compteur si le mot n'a pas encore été rencontré
                      wordCount[word] = 1;
                  }
              }
          
              // Filtrer les résultats pour inclure uniquement les mots cibles
              const filteredWordCount: Record<string, number> = {};
              for (const targetWord of targetWords) {
                  filteredWordCount[targetWord] = wordCount[targetWord] || 0;
              }
          
              return filteredWordCount;
          }
          
        
          
          
          function calculateCosineSimilarity(wordsArray: string[], targetWords: string[]): number {
            const wordOccurrences = countWordOccurrences(wordsArray, targetWords);
        
            // Calculer la similarité cosinus entre les occurrences des mots dans wordsArray et targetWords
            const dotProduct = targetWords.reduce((sum, word) => sum + (wordOccurrences[word] || 0), 0);
            const magnitudeWordsArray = Math.sqrt(wordsArray.length);
            const magnitudeTargetWords = Math.sqrt(targetWords.length);
        
            if (magnitudeWordsArray === 0 || magnitudeTargetWords === 0) {
                return 0; // Éviter la division par zéro
            }
        
            return dotProduct / (magnitudeWordsArray * magnitudeTargetWords);
        }
        
        
        type TargetSet = {
          name: string;
          words: string[];
      };
      
      const allTargetWords: TargetSet[] = [
          { name: 'Developpement logiciel', words: ['developpement', 'logiciel', 'javascript', 'http', 'css', 'python', 'java', 'js', 'ts', 'typescript', 'backend', 'frontend', 'web', 'mobile', 'android', 'flatter'] },
          { name: 'Administration système et réseau', words: ['administration', 'système', 'et', 'réseau', 'windows', 'linux', 'securité'] },
          { name: 'Base de donnée', words: ['base', 'de', 'donné', 'sql', 'bigdata', 'postgres', 'nosql','mongodb','firebase'] }
      ];
      
      let bestTargetWords: TargetSet = { name: '', words: [] };
      let maxSimilarity = -1;
      
      // Trouver le meilleur ensemble de targetWords
      for (const targetSet of allTargetWords) {
          const similarity = calculateCosineSimilarity(wordsArray, targetSet.words);
      
          if (similarity > maxSimilarity) {
              maxSimilarity = similarity;
              bestTargetWords = targetSet;
          }
      }
      
      console.log(`Le meilleur ensemble de targetWords est : ${bestTargetWords.name} avec une similarité de ${maxSimilarity}`);
      const filteredDataList: Post []=[] ;
      const filteredData = postData
      .filter((item) => item.type_post === bestTargetWords.name)
      .map((item) => {
        // Appliquer la logique de mappage spécifique pour le cas où bestTargetWords.name est égal à "type_post"
        const mappedItem = {
          id: item.id ,// Assurez-vous de donner un nom à la propriété "id"
          title: item.title,
          photo: item.photo,
          url : item.url,
          type_post: item.type_post,
          description : item.description,
          tag: item.tag,
          crated_at: item.crated_at,
          commentaire : item.commentaire,
          id_user: item.id_user,
        };
    
        // Ajouter le résultat mappé à la liste
        filteredDataList.push(mappedItem);
  
        // Retourner le résultat mappé si nécessaire
        return mappedItem;
      });
    

    // Utilisez filteredData comme nécessaire
    console.log('filteredData',filteredData);

console.log( 'postData',postData)



  const likeHandler = () => {
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
  };


  return (
    <>
    
    <Header />
    <div className="TeamPost">
    
    <NavigationMenuProfile/>
    <div className="postList">
    {filteredData.map((item) => (
      
        
      <div className="postWrapper"  key={item.id} >
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="src/assets/pers.jpg"
              alt=""
            />
            <span className="postUsername">
            </span>
            {userData.map((userData) => (
                  <div key={userData.id}>
                      <span className="postDate">{ userData.id==item.id_user? userData.username:""}</span>
                  </div>
              ))}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          
          <span className="postText">{item.title}</span>
          <img className="postImg" src={item.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
            <span className="postLikeCounter"> people like it</span>
          
          </div>
          <div className="postBottomRight">
          <span className="postCommentText"> Join </span>
          </div>
        </div>
      </div>
      
    ))}
    </div>
    </div>
      </>
  );
}

