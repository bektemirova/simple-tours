import './App.css';
import {useState, useEffect} from 'react'
const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([])
  const [readMore, setReadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showUI, setShowUI] = useState([])

  const getData = async () => {

    try {
      let res = await fetch(url)
      let data = await res.json()
      console.log(data)
      setTours(data)
      setShowUI(data)



    } catch (err) {
      console.log(err, "error with data")
    }
  }
  useEffect(() => {
    getData()

  }, [])
  const handleDelete = (currIndex) => {
    let remove = tours.filter(el => el.id !== currIndex)
    setTours(remove)
  }


  //if (tours === []) {
  //  <button onClick={}>Reset</button>
  //}

  return (

    <main>


      <h2 className='title'>All Tours</h2>

      {(tours.length === 0) ?
        <button onClick={() => setTours(showUI)}>Reset</button> :



        <>

          {

            tours.map((card) => {
              const {id, name, info, image, price} = card
              return (
                <div key={id} className="single-tour">

                  <img src={image} />
                  <div className='tour-info'>
                    <h3>{name}</h3>
                    <h3 className="tour-price" >{price}</h3>
                  </div>
                  <p >
                    {
                      readMore ? info : `${ info.substring(0, 150) }`
                    }
                    <button onClick={() => setReadMore(!readMore)}>{readMore ? 'show less' : 'read more'}</button>
                  </p>

                  <button className='delete-btn' onClick={() => handleDelete(id)}>Not intersted</button>
                </div>


              )
            })

          }
        </>
      }
    </main >
  );
}

export default App;
