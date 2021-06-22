export const capitalize = (text) => {
  return text.replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};

export const countMinute = (text) => {
  const wordCount = text.split(" ").length;
  const wordPerMinute = 50;
  const readMinute = wordCount < wordPerMinute ? 1 : Math.floor(wordCount / wordPerMinute);
  return readMinute;
};

export const apiCallEdit = async (lang,state)=>{
  const updatedArticle = await fetch("/api/data?lang=" + lang, {
    headers: {
      accept: "*/*",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
    },
    body: JSON.stringify({
      title: capitalize(state.title),
      text: state.text,
      _id: state.id,
    }),
    method: "PUT",
    credentials: "omit",
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return updatedArticle
}

export const apiCallAdd =async (lang,state)=>{
  const newArticle = await fetch("/api/data?lang=" + lang, {
    headers: {
      accept: "*/*",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify({
      title: capitalize(state.title),
      text: state.text,
      readMin:countMinute(state.text)
    }),
    method: "POST",
    mode: "cors",
    credentials: "omit",
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return newArticle
}

export const apiCallClap =async (lang,state)=>{
  const incrementClap = await fetch("/api/clap?lang=" + lang, {
    headers: {
      accept: "*/*",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
    },
    body: JSON.stringify({
      clapCount: state.clapC + 1,
      _id: state.id,
    }),
    method: "PUT",
    credentials: "omit",
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return incrementClap

}