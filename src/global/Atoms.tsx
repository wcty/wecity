import { atom } from 'recoil';
//import { useCookies} from "react-cookie";
//import { isNullishCoalesce } from 'typescript';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//const [cookies, setCookie] = useCookies(["lang"]);

export const locationAtom = atom({
  key: 'location', 
  default: null, 
});

export const viewAtom = atom({
  key: 'view', 
  default: {
    latitude: 50.4501,
    longitude: 30.5234,
  }, 
});

export const markerAtom = atom({
  key: 'marker',
  default: null,
});

export const selectedAtom = atom({
  key: 'selected',
  default: null,
});

export const markersAtom = atom({
  key: 'markers',
  default: {type:"FeatureCollection", features:[]},
});

export const creatingAtom = atom({
  key: 'creating',
  default: false,
});

export const userAtom = atom({
  key: 'user',
  default: null,
});

export const initiativeBarAtom = atom({
  key: 'initiativeBar',
  default: false,
})

export const projectBarAtom = atom({
  key: 'projectBar',
  default: false,
})

export const resourceBarAtom = atom({
  key: 'resourceBar',
  default: false,
})

export const joiningAtom = atom({
  key: 'joining',
  default: false,
})

export const expanded = atom({
  key: 'expanded',
  default: false,
})

export const initiative = atom({
  key: 'initiative',
  default: false,
})

export const selectType = atom({
  key: 'selectType',
  default: null,
})

export const selectedProject = atom({
  key: 'selectedProject',
  default: null,
})

type Language = 'en' | 'uk' //List of implemented languages (using html iso ref)

let defineLang = function():Language{
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

export const lang = atom({
  key: 'language',
  default: defineLang(), 
})

export const imageURL = atom({
  key: 'imageURL',
  default: null,
})

export const fileName = atom({
  key: 'fileName',
  default: null,
})

export const showBarAtom = atom({
  key: 'showBar',
  default: true,
})

export const replyAtom = atom({
  key: 'reply',
  default: {},
})

export const replyFieldAtom = atom({
  key: 'replyField',
  default: undefined,
})

export const swipePosition = atom({
  key: 'swipePosition',
  default: 0,
})

export const minDistance = atom({
  key: 'minDistance',
  default: 0,
})