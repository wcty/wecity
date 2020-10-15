import { gql } from '@apollo/client'

const shortInitiativeShape = (d)=>`
  geometry {
    type
    coordinates
  }
  properties {
    name
    ${d?'distance':''}
    uid
    imageURL{
      l
      xs
    }
    members {
      uid
    }
  }
`

const initiativeShape = (d)=>`
  _id
  geometry {
    type
    coordinates
  }
  properties {
    name
    ${d?'distance':''}
    uid
    imageURL{
      xs
      s
      m
      l
    }
    members {
      uid
      roles {
        Initiator
        Donator
        Volunteer
        Provider
        Contractor
      }
    }
    outcome
    problem
    context
  }
`

export const nearbyInitiatives = gql`
  query GetNearInitiatives($nearInitiativesInput: NearInitiativesInput!) {
    nearInitiatives(input: $nearInitiativesInput) {
      ${shortInitiativeShape(true)}
    }
  }
`;

export const getInitiative = gql`
  query GetInitiative($UID:String!){
    initiative(uid:$UID){
      ${initiativeShape(false)}
    }
  }
`;

export const createInitiativeMutation = gql`
  mutation CreateInitiative($initiative:CreateInitiativeInput!){
    createInitiative(initiative:$initiative){
      ${initiativeShape(false)}
    }
  }
`;

export const updateInitiativeMutation = gql`
  mutation UpdateInitiative($UID:String!, $initiative: UpdateInitiativeInput!){
    updateInitiative(uid:$UID, initiative:$initiative){
      ${initiativeShape(false)}
    }
  }
`

export const deleteInitiative = gql`
  mutation DeleteInitiative($UID:String!){
    deleteInitiative(uid:$UID){
      _id
    }
  }
`

export const addInitiativeMember = gql`
  mutation UpdateInitiativeMember($UID:String!, $member: InitiativeMemberInput){
    addInitiativeMember(uid:$UID, member:$member){
      ${initiativeShape(false)}
    }
  }
`

export const updateInitiativeMember = gql`
  mutation UpdateInitiativeMember($UID:String!, $member: InitiativeMemberInput){
    updateInitiativeMember(uid:$UID, member:$member){
      properties {
        members{
          uid
          roles {
            Initiator
            Donator
            Provider
            Volunteer
          }
        }
      }
    }
  }
`
