import {useEffect, useState} from "react";
import { SearchBar } from "./Searchbar/SearchBar";
import { getImagesPixabay } from "Services/ImagesAPI";
import { Notify } from "notiflix";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";


export const App = () => {
  
  const [query, setQuery] = useState('')
  const [totalHits, setTotalHits] = useState(0)
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [isLoader, setIsLoader] = useState(false)

  useEffect(() => {
    if (query !== '') {
      setIsLoader(true)
      getImagesPixabay(page, query)
      .then(data => {
          if (data.data.totalHits === 0) {
            Notify.failure("Sorry! Can't find any pictures");
          }
      setImages((prevState) => { return [...prevState, ...data.data.hits] })
      setTotalHits(data.data.totalHits)
          }).catch(err => console.log(err))
          .finally(() => setIsLoader(false))
    }
  }, [page, query])

  function onSubmit (ev){
    ev.preventDefault()
    const queryInput = ev.currentTarget.searchInput.value.trim()
    setQuery(queryInput)
    setPage(1)
    setImages([])
  }

  function loadMore() {
    setPage(prevState => {
      return (prevState + 1)
    })
  }

  
    return (<>
      <SearchBar onSubmit={onSubmit}/>
      {isLoader && <Loader/>}
      {images.length > 0 && (<>
      <ImageGallery images={images}/>
        {images.length !== totalHits && <Button loadMore={loadMore} />}
        </>
      )}
    </>)
  }

