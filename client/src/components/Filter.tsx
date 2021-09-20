import React, {useState} from "react";
import {useAppDispatch} from "../redux/hook";
import {filterProducts} from "../redux/store/productSlice";


function Filter(props: any) {
  const dispatch = useAppDispatch();

  const [searchKey, setSearchKey] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("popular")
  const [category, setCategory] = useState<string>("all")

  return (
    <div className="mx-2">

      <div className="row justify-content-center shadow p-3 mb-5 rounded ">


        <div className="col-md-3 mt-3">
          <input
            value={searchKey}
            onChange={onChangeSetSearchKey}
            type="text"
            placeholder="search products"
            className="form-control" />

        </div>

        <div className="col-md-2 mt-4 ml-2">

          <select
            className="form-control"
            value={sortKey}
            onChange={onChangeSetSortKey}>
            <option value="popular">Popular</option>
            <option value="hightolow">High to Low</option>
            <option value="lowtohigh">Low to High</option>
          </select>

        </div>

        <div className="col-md-2 mt-4 ml-2">

          <select
            className="form-control"
            value={category}
            onChange={onChangeSetCategoryKey}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="mobiles">Mobiles</option>
            <option value="games">Games</option>
          </select>


        </div>

        <div className="col-md-2 mt-4 ml-2">

          <button className="btn" onClick={onClickFilterProducts}>
            Filter
          </button>

        </div>

      </div>

    </div>  
  )
  
  function onChangeSetSearchKey (e: React.ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  function onChangeSetSortKey (e: React.ChangeEvent<HTMLSelectElement>) {
    setSortKey(e.target.value); 
  }
  
  function onChangeSetCategoryKey (e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value); 
  }

  function onClickFilterProducts (e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(filterProducts({searchKey, sortKey, category}));  
  }

}

export default Filter;

