/* global i18n */
import en from 'i18n/en.js'
import uk from 'i18n/uk.js'
import ka from 'i18n/ka.js'
import fi from 'i18n/fi.js'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import * as Atoms from 'global/Atoms'

const languages = {
    en,
    uk,
    ka,
    fi
}
let defineLang = function(lang){
  switch(lang) {
      case 'uk':
          return 'uk';
      case 'ka':
          return 'ka';
      case 'fi':
          return 'fi';
      default:
          return 'en';
  }
}
let defaultLanguage = defineLang(window.navigator.language.slice(0,2))

window.i18nData = languages[defaultLanguage];

window.i18n = (key, params) => {
  if (params || params === 0) {
      let i18nKey = window.i18nData[key];

      if (typeof params !== 'object') {
          i18nKey = i18nKey.replace('{0}', params);
      } else {
          for (let i = 0; i < params.length; i++) {
              i18nKey = i18nKey.replace(`{${i}}`, params[i]);
          }
      }
      const choiceRegex = /{choice[a-zA-Z0-9{}\s<>=|#]+}/g;
      const choicesRegex = /#[<>=0-9a-zA-Z|\s]+#/g
      
      if (i18nKey.match(choiceRegex)) {
          for (const choicePattern of i18nKey.match(choiceRegex)) {
              const decisionMaker = parseInt(choicePattern.replace(choicesRegex, '')
                                                 .replace('{choice', '')
                                                 .replace('}', '')
                                                 .trim(), 10);
      
              const choices = choicePattern.match(choicesRegex)[0]
                                           .replace(/#/g, '');
      
              const operators = choices.match(/[<>=]+/g);
              const numbers = choices.match(/[0-9]+/g).map(num => parseInt(num, 10));
              const words = choices.match(/[a-zA-Z]+/g);
      
              let indexToUse = 0;
      
              for (let i = 0; i < words.length; i++) {
                  switch (operators[i]) {
                      case '<':  indexToUse = numbers[i] < decisionMaker ? i : indexToUse; break;
                      case '>':  indexToUse = numbers[i] > decisionMaker ? i : indexToUse; break;
                      case '<=': indexToUse = numbers[i] <= decisionMaker ? i : indexToUse; break;
                      case '>=': indexToUse = numbers[i] >= decisionMaker ? i : indexToUse; break;
                      case '=':  indexToUse = numbers[i] === decisionMaker ? i : indexToUse; break;
                      default: indexToUse = numbers[i] === decisionMaker ? i : indexToUse; break;
                  }
              }
      
              i18nKey = i18nKey.replace(choicePattern, [decisionMaker, words[indexToUse]].join(' '));
          }
      }
      return i18nKey;
  } else {
      return window.i18nData[key];
  }
};


window.changeLanguage = (lang) => {
  window.i18nData = languages[lang];
}
export default ()=>{
  const [lang, setLang] = useRecoilState(Atoms.lang);
  useEffect(()=>{
    defaultLanguage = lang
    window.i18nData = languages[lang];
  },[lang, window])
  return null
}