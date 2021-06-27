const TR = {
  lang: "tr",
  navbars: [
    { query: "about", title: "HAKKIMDA" },
    { query: "blog",title: ["BLOG",<b key="blog-pop" className="article-created">✔</b>]},
    { query: "gallery", title: "GALERİ" },
    { query: "admin", title: "ADMİN" },
  ],
  status_404:[
    { query:"404", msg:  "Ne ararsan bulunur, derde devadan gayrı!  < 404 />"}
],
admin:[
    {query:"admin",newArticle:"Yeni Makale",articles:"Makaleler"}
],
gallery:[
    {query:"gallery",title:"PROJELER"}
]
};

const EN = {
    lang: "en",
    navbars: [
      { query: "about", title: "ABOUT" },
      { query: "blog",title: ["BLOG",<b key="blog-pop" className="article-created">✔</b>]},
      { query: "gallery", title: "GALLERY" },
      { query: "admin", title: "ADMIN" },
    ],
    status_404:[
        { query:"404", msg: "Soryy! There is no such a thing!  < 404 />"}
    ],
    admin:[
        {query:"admin",newArticle:"New Article",articles:"The Articles"}
    ],
    gallery:[
        {query:"gallery",title:"PROJECST"}
    ]
  };

  const DE = {
    lang: "de",
    navbars: [
      { query: "about", title: "ÜBER MICH" },
      { query: "blog",title: ["BLOG",<b key="blog-pop" className="article-created">✔</b>]},
      { query: "gallery", title: "GALLERIE" },
      { query: "admin", title: "ADMIN" },
    ],
    status_404:[
        { query:"404", msg: "Was du suchst ist nicht hier!  < 404 />"}
    ],
    admin:[
        {query:"admin",newArticle:"Neuer Artikel",articles:"Die Artikel"}
    ],
    gallery:[
        {query:"gallery",title:"DIE PROJEKTE"}
    ]
  };
  export const changeUIText= (lang) => {

  switch (lang) {
    case "tr":
      return TR

    case "en":
      return EN

    case "de":
      return DE

    default:
      return TR
  }
};

