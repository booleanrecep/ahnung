export const CircleArticleCreated =(created,title,IP)=>{
    return(
        <div style={{ display: created }} className="article-created">
            <span>&#10004;</span>
            <b>{title}</b>
            <i>created</i>
            <span>
              <small>Your IP: </small>
              <strong>
                <small>{IP}</small>
              </strong>
            </span>
          </div>
    )
}