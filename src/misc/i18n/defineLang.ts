import Cookies from 'universal-cookie';
const cookies = new Cookies();

type Language = 'en' | 'uk' //List of implemented languages (using html iso ref)

export const defineLang = function():Language{
  const implementedLang =  ['en', 'uk'] //List of implemented languages (using html iso ref)

  let navLang:any = window.navigator.language.slice(0,2)  //=browser language
  let lang:Language //=return language

  if (implementedLang.indexOf(cookies.get('lang')) >-1 ) { //if there is a set language in the cookies: use it as language
    lang = cookies.get('lang')
  } else{
    lang= navLang in implementedLang ? navLang : 'en' //set language to english if browser language is not implemented
    cookies.set('lang', lang, { path: '/' }); //set language cookie
  }
  return lang
}
