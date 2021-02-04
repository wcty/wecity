import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "i18n" */
export type I18n = {
  __typename?: 'i18n';
  category: Scalars['String'];
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  uk?: Maybe<Scalars['String']>;
};

/** aggregated selection of "i18n" */
export type I18n_Aggregate = {
  __typename?: 'i18n_aggregate';
  aggregate?: Maybe<I18n_Aggregate_Fields>;
  nodes: Array<I18n>;
};

/** aggregate fields of "i18n" */
export type I18n_Aggregate_Fields = {
  __typename?: 'i18n_aggregate_fields';
  avg?: Maybe<I18n_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<I18n_Max_Fields>;
  min?: Maybe<I18n_Min_Fields>;
  stddev?: Maybe<I18n_Stddev_Fields>;
  stddev_pop?: Maybe<I18n_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<I18n_Stddev_Samp_Fields>;
  sum?: Maybe<I18n_Sum_Fields>;
  var_pop?: Maybe<I18n_Var_Pop_Fields>;
  var_samp?: Maybe<I18n_Var_Samp_Fields>;
  variance?: Maybe<I18n_Variance_Fields>;
};


/** aggregate fields of "i18n" */
export type I18n_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<I18n_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "i18n" */
export type I18n_Aggregate_Order_By = {
  avg?: Maybe<I18n_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<I18n_Max_Order_By>;
  min?: Maybe<I18n_Min_Order_By>;
  stddev?: Maybe<I18n_Stddev_Order_By>;
  stddev_pop?: Maybe<I18n_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<I18n_Stddev_Samp_Order_By>;
  sum?: Maybe<I18n_Sum_Order_By>;
  var_pop?: Maybe<I18n_Var_Pop_Order_By>;
  var_samp?: Maybe<I18n_Var_Samp_Order_By>;
  variance?: Maybe<I18n_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "i18n" */
export type I18n_Arr_Rel_Insert_Input = {
  data: Array<I18n_Insert_Input>;
  on_conflict?: Maybe<I18n_On_Conflict>;
};

/** aggregate avg on columns */
export type I18n_Avg_Fields = {
  __typename?: 'i18n_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "i18n" */
export type I18n_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "i18n". All fields are combined with a logical 'AND'. */
export type I18n_Bool_Exp = {
  _and?: Maybe<Array<Maybe<I18n_Bool_Exp>>>;
  _not?: Maybe<I18n_Bool_Exp>;
  _or?: Maybe<Array<Maybe<I18n_Bool_Exp>>>;
  category?: Maybe<String_Comparison_Exp>;
  en?: Maybe<String_Comparison_Exp>;
  fr?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  key?: Maybe<String_Comparison_Exp>;
  uk?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "i18n_categories" */
export type I18n_Categories = {
  __typename?: 'i18n_categories';
  category: Scalars['String'];
  /** An array relationship */
  i18ns: Array<I18n>;
  /** An aggregated array relationship */
  i18ns_aggregate: I18n_Aggregate;
};


/** columns and relationships of "i18n_categories" */
export type I18n_CategoriesI18nsArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


/** columns and relationships of "i18n_categories" */
export type I18n_CategoriesI18ns_AggregateArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};

/** aggregated selection of "i18n_categories" */
export type I18n_Categories_Aggregate = {
  __typename?: 'i18n_categories_aggregate';
  aggregate?: Maybe<I18n_Categories_Aggregate_Fields>;
  nodes: Array<I18n_Categories>;
};

/** aggregate fields of "i18n_categories" */
export type I18n_Categories_Aggregate_Fields = {
  __typename?: 'i18n_categories_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<I18n_Categories_Max_Fields>;
  min?: Maybe<I18n_Categories_Min_Fields>;
};


/** aggregate fields of "i18n_categories" */
export type I18n_Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<I18n_Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "i18n_categories" */
export type I18n_Categories_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<I18n_Categories_Max_Order_By>;
  min?: Maybe<I18n_Categories_Min_Order_By>;
};

/** input type for inserting array relation for remote table "i18n_categories" */
export type I18n_Categories_Arr_Rel_Insert_Input = {
  data: Array<I18n_Categories_Insert_Input>;
  on_conflict?: Maybe<I18n_Categories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "i18n_categories". All fields are combined with a logical 'AND'. */
export type I18n_Categories_Bool_Exp = {
  _and?: Maybe<Array<Maybe<I18n_Categories_Bool_Exp>>>;
  _not?: Maybe<I18n_Categories_Bool_Exp>;
  _or?: Maybe<Array<Maybe<I18n_Categories_Bool_Exp>>>;
  category?: Maybe<String_Comparison_Exp>;
  i18ns?: Maybe<I18n_Bool_Exp>;
};

/** unique or primary key constraints on table "i18n_categories" */
export enum I18n_Categories_Constraint {
  /** unique or primary key constraint */
  CategoryIndex = 'category_index',
  /** unique or primary key constraint */
  I18nCategoriesPkey = 'i18n_categories_pkey'
}

/** input type for inserting data into table "i18n_categories" */
export type I18n_Categories_Insert_Input = {
  category?: Maybe<Scalars['String']>;
  i18ns?: Maybe<I18n_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type I18n_Categories_Max_Fields = {
  __typename?: 'i18n_categories_max_fields';
  category?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "i18n_categories" */
export type I18n_Categories_Max_Order_By = {
  category?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type I18n_Categories_Min_Fields = {
  __typename?: 'i18n_categories_min_fields';
  category?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "i18n_categories" */
export type I18n_Categories_Min_Order_By = {
  category?: Maybe<Order_By>;
};

/** response of any mutation on the table "i18n_categories" */
export type I18n_Categories_Mutation_Response = {
  __typename?: 'i18n_categories_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<I18n_Categories>;
};

/** input type for inserting object relation for remote table "i18n_categories" */
export type I18n_Categories_Obj_Rel_Insert_Input = {
  data: I18n_Categories_Insert_Input;
  on_conflict?: Maybe<I18n_Categories_On_Conflict>;
};

/** on conflict condition type for table "i18n_categories" */
export type I18n_Categories_On_Conflict = {
  constraint: I18n_Categories_Constraint;
  update_columns: Array<I18n_Categories_Update_Column>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};

/** ordering options when selecting data from "i18n_categories" */
export type I18n_Categories_Order_By = {
  category?: Maybe<Order_By>;
  i18ns_aggregate?: Maybe<I18n_Aggregate_Order_By>;
};

/** primary key columns input for table: "i18n_categories" */
export type I18n_Categories_Pk_Columns_Input = {
  category: Scalars['String'];
};

/** select columns of table "i18n_categories" */
export enum I18n_Categories_Select_Column {
  /** column name */
  Category = 'category'
}

/** input type for updating data in table "i18n_categories" */
export type I18n_Categories_Set_Input = {
  category?: Maybe<Scalars['String']>;
};

/** update columns of table "i18n_categories" */
export enum I18n_Categories_Update_Column {
  /** column name */
  Category = 'category'
}

/** unique or primary key constraints on table "i18n" */
export enum I18n_Constraint {
  /** unique or primary key constraint */
  I18nPkey = 'i18n_pkey',
  /** unique or primary key constraint */
  KeyIndex = 'key_index'
}

/** input type for incrementing integer column in table "i18n" */
export type I18n_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "i18n" */
export type I18n_Insert_Input = {
  category?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  uk?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type I18n_Max_Fields = {
  __typename?: 'i18n_max_fields';
  category?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  uk?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "i18n" */
export type I18n_Max_Order_By = {
  category?: Maybe<Order_By>;
  en?: Maybe<Order_By>;
  fr?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  key?: Maybe<Order_By>;
  uk?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type I18n_Min_Fields = {
  __typename?: 'i18n_min_fields';
  category?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  uk?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "i18n" */
export type I18n_Min_Order_By = {
  category?: Maybe<Order_By>;
  en?: Maybe<Order_By>;
  fr?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  key?: Maybe<Order_By>;
  uk?: Maybe<Order_By>;
};

/** response of any mutation on the table "i18n" */
export type I18n_Mutation_Response = {
  __typename?: 'i18n_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<I18n>;
};

/** input type for inserting object relation for remote table "i18n" */
export type I18n_Obj_Rel_Insert_Input = {
  data: I18n_Insert_Input;
  on_conflict?: Maybe<I18n_On_Conflict>;
};

/** on conflict condition type for table "i18n" */
export type I18n_On_Conflict = {
  constraint: I18n_Constraint;
  update_columns: Array<I18n_Update_Column>;
  where?: Maybe<I18n_Bool_Exp>;
};

/** ordering options when selecting data from "i18n" */
export type I18n_Order_By = {
  category?: Maybe<Order_By>;
  en?: Maybe<Order_By>;
  fr?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  key?: Maybe<Order_By>;
  uk?: Maybe<Order_By>;
};

/** primary key columns input for table: "i18n" */
export type I18n_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "i18n" */
export enum I18n_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  En = 'en',
  /** column name */
  Fr = 'fr',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Uk = 'uk'
}

/** input type for updating data in table "i18n" */
export type I18n_Set_Input = {
  category?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  uk?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type I18n_Stddev_Fields = {
  __typename?: 'i18n_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "i18n" */
export type I18n_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type I18n_Stddev_Pop_Fields = {
  __typename?: 'i18n_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "i18n" */
export type I18n_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type I18n_Stddev_Samp_Fields = {
  __typename?: 'i18n_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "i18n" */
export type I18n_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type I18n_Sum_Fields = {
  __typename?: 'i18n_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "i18n" */
export type I18n_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "i18n" */
export enum I18n_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  En = 'en',
  /** column name */
  Fr = 'fr',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Uk = 'uk'
}

/** aggregate var_pop on columns */
export type I18n_Var_Pop_Fields = {
  __typename?: 'i18n_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "i18n" */
export type I18n_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type I18n_Var_Samp_Fields = {
  __typename?: 'i18n_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "i18n" */
export type I18n_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type I18n_Variance_Fields = {
  __typename?: 'i18n_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "i18n" */
export type I18n_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "i18n" */
  delete_i18n?: Maybe<I18n_Mutation_Response>;
  /** delete single row from the table: "i18n" */
  delete_i18n_by_pk?: Maybe<I18n>;
  /** delete data from the table: "i18n_categories" */
  delete_i18n_categories?: Maybe<I18n_Categories_Mutation_Response>;
  /** delete single row from the table: "i18n_categories" */
  delete_i18n_categories_by_pk?: Maybe<I18n_Categories>;
  /** insert data into the table: "i18n" */
  insert_i18n?: Maybe<I18n_Mutation_Response>;
  /** insert data into the table: "i18n_categories" */
  insert_i18n_categories?: Maybe<I18n_Categories_Mutation_Response>;
  /** insert a single row into the table: "i18n_categories" */
  insert_i18n_categories_one?: Maybe<I18n_Categories>;
  /** insert a single row into the table: "i18n" */
  insert_i18n_one?: Maybe<I18n>;
  /** update data of the table: "i18n" */
  update_i18n?: Maybe<I18n_Mutation_Response>;
  /** update single row of the table: "i18n" */
  update_i18n_by_pk?: Maybe<I18n>;
  /** update data of the table: "i18n_categories" */
  update_i18n_categories?: Maybe<I18n_Categories_Mutation_Response>;
  /** update single row of the table: "i18n_categories" */
  update_i18n_categories_by_pk?: Maybe<I18n_Categories>;
};


/** mutation root */
export type Mutation_RootDelete_I18nArgs = {
  where: I18n_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_I18n_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_I18n_CategoriesArgs = {
  where: I18n_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_I18n_Categories_By_PkArgs = {
  category: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_I18nArgs = {
  objects: Array<I18n_Insert_Input>;
  on_conflict?: Maybe<I18n_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_I18n_CategoriesArgs = {
  objects: Array<I18n_Categories_Insert_Input>;
  on_conflict?: Maybe<I18n_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_I18n_Categories_OneArgs = {
  object: I18n_Categories_Insert_Input;
  on_conflict?: Maybe<I18n_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_I18n_OneArgs = {
  object: I18n_Insert_Input;
  on_conflict?: Maybe<I18n_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_I18nArgs = {
  _inc?: Maybe<I18n_Inc_Input>;
  _set?: Maybe<I18n_Set_Input>;
  where: I18n_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_I18n_By_PkArgs = {
  _inc?: Maybe<I18n_Inc_Input>;
  _set?: Maybe<I18n_Set_Input>;
  pk_columns: I18n_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_I18n_CategoriesArgs = {
  _set?: Maybe<I18n_Categories_Set_Input>;
  where: I18n_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_I18n_Categories_By_PkArgs = {
  _set?: Maybe<I18n_Categories_Set_Input>;
  pk_columns: I18n_Categories_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "i18n" */
  i18n: Array<I18n>;
  /** fetch aggregated fields from the table: "i18n" */
  i18n_aggregate: I18n_Aggregate;
  /** fetch data from the table: "i18n" using primary key columns */
  i18n_by_pk?: Maybe<I18n>;
  /** fetch data from the table: "i18n_categories" */
  i18n_categories: Array<I18n_Categories>;
  /** fetch aggregated fields from the table: "i18n_categories" */
  i18n_categories_aggregate: I18n_Categories_Aggregate;
  /** fetch data from the table: "i18n_categories" using primary key columns */
  i18n_categories_by_pk?: Maybe<I18n_Categories>;
};


/** query root */
export type Query_RootI18nArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


/** query root */
export type Query_RootI18n_AggregateArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


/** query root */
export type Query_RootI18n_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootI18n_CategoriesArgs = {
  distinct_on?: Maybe<Array<I18n_Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Categories_Order_By>>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};


/** query root */
export type Query_RootI18n_Categories_AggregateArgs = {
  distinct_on?: Maybe<Array<I18n_Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Categories_Order_By>>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};


/** query root */
export type Query_RootI18n_Categories_By_PkArgs = {
  category: Scalars['String'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "i18n" */
  i18n: Array<I18n>;
  /** fetch aggregated fields from the table: "i18n" */
  i18n_aggregate: I18n_Aggregate;
  /** fetch data from the table: "i18n" using primary key columns */
  i18n_by_pk?: Maybe<I18n>;
  /** fetch data from the table: "i18n_categories" */
  i18n_categories: Array<I18n_Categories>;
  /** fetch aggregated fields from the table: "i18n_categories" */
  i18n_categories_aggregate: I18n_Categories_Aggregate;
  /** fetch data from the table: "i18n_categories" using primary key columns */
  i18n_categories_by_pk?: Maybe<I18n_Categories>;
};


/** subscription root */
export type Subscription_RootI18nArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootI18n_AggregateArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootI18n_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootI18n_CategoriesArgs = {
  distinct_on?: Maybe<Array<I18n_Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Categories_Order_By>>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootI18n_Categories_AggregateArgs = {
  distinct_on?: Maybe<Array<I18n_Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Categories_Order_By>>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootI18n_Categories_By_PkArgs = {
  category: Scalars['String'];
};
