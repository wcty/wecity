import { useMutation, gql } from '@apollo/client';


const addKey = gql`
    mutation MyMutation {
        insert_i18n(objects: {}) {
        affected_rows
        }
    }
 `  