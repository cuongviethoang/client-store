const PageIndex=({pageIndex,setPageIndex,orders})=>{
    return(
        <div className="table-index">
            <div className="table-rows">
                {((pageIndex-1)*10+1) + " - " + Math.min(pageIndex*10,orders.length) +" of "+orders.length}
            </div>
            <button disabled={pageIndex == 1 ? true:false} 
                onClick={()=>setPageIndex(pageIndex-1)}
                className="btn btn-outline-secondary">
                <i className="fa-solid fa-backward"></i>
            </button>
            <button disabled={pageIndex*10 >= orders.length ? true:false} 
                onClick={()=>setPageIndex(pageIndex+1)}
                className="btn btn-outline-secondary">
                <i className="fa-solid fa-forward"></i>
            </button>
        </div>
    )
}
export default PageIndex