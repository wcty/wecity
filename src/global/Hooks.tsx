import React from 'react'
import { useState, useEffect, useRef } from 'react'
import defaultLang from './defaultLang.json'
import { useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useQuery, gql, InMemoryCache, ApolloConsumer, ApolloClient, createHttpLink, NormalizedCacheObject} from '@apollo/client'
import {useUser, useAuth} from 'reactfire'
import {User} from 'firebase'

import { setContext } from '@apollo/client/link/context';

type Client = ApolloClient<NormalizedCacheObject>|undefined

export const useClient = () => {
  const [state, setState]= useState<Client>()
  const user:User = useUser()
  const auth = useAuth()

  useEffect(()=>{
    
      if(!user) {
        auth.signInAnonymously()
      }else{
        localStorage.setItem('token', user.uid);
        //console.log(process.env.REACT_APP_HASURA_ADMIN)
        const httpLink = createHttpLink({
          uri: 'https://hasura.weee.city/v1/graphql',
        });
        
        const authLink = setContext((_, { headers }) => {
          // get the authentication token from local storage if it exists
          const token = localStorage.getItem('token');
          // return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          }
        });
        const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache({
            addTypename: false
            
          }),

        });
        //console.log(user)
        setState(client)
      }
      
  },[user, auth])

  return state
}

export function usePrevious(value:any) {
  
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useLocation() {
  const defaultValue = {longitude: 30.5234, latitude: 50.4501}
  const [location, setLocation] = useState(defaultValue)
  
  useEffect(()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const updateLocation = position.coords.longitude?{
          longitude: position.coords.longitude, latitude: position.coords.latitude}:defaultValue
        setLocation(updateLocation);
      })
    }
  }, [ defaultValue ])

  return location
}

export const useI18n = ()=>{
  const lang = useRecoilValue(Atoms.lang)
  const client = useClient()
  const DICTIONARY = (l:String)=> gql`
    query Dictionary{
      i18n(order_by: {key: asc}) {
        ${l}
        key
      }
    }
  `

  type MapSchema<T extends Record<string, string>> = {
    -readonly [K in keyof T]: string
  }

  let dataObject = {...defaultLang} as const;
  type i18n = MapSchema<typeof dataObject>

  const [i18nData, setI18nData] = useState<i18n>({...defaultLang})

  useEffect(()=>{
    client?.query({
      query : DICTIONARY(lang)
    }).then((data)=>{
      const langObject:i18n = data.data.i18n.reduce((a:any,b:any)=>{
        const {key, ...value} = b
        a[key]=Object.values(value)[0]
        return a
      }, {})
      setI18nData(langObject)
    })
  },[lang, client])

  return function getI18n <K extends keyof i18n> (key:K, params?:any):i18n[K] {
    if (params===false || params || params === 0) {
        let i18nKey = i18nData[key];
        const choiceRegex = /{#choice.*#}/g;

        if(typeof params !== 'object'){
          if(i18nKey){
            i18nKey = i18nKey.replace('{0}', params);
          }
          Choice(params, i18nKey, choiceRegex)
        }else{
          for (let i = 0; i < params.length; i++) {
            if(i18nKey){
              i18nKey = i18nKey.replace(`{${i}}`, params[i]);
            }
            Choice(params[i], i18nKey, choiceRegex)
          }
        }
        
        return i18nKey;
    }else{
        return i18nData[key];
    }
  }
}

function Choice(value:any, i18nKey:String, choiceRegex:RegExp){
  for (const choicePattern of i18nKey.match(choiceRegex)??[]) {
    const choices = choicePattern.replace('{#choice','').replace('#}','').split('|')
    if(i18nKey){
      i18nKey = i18nKey.replace(choicePattern, choices[!value?0:1]);
    }
  }
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}