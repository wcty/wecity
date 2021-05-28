import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  float8: any;
  geography: any;
  geometry: any;
  timestamptz: any;
  timetz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
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

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};


/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "files" */
export type Files = {
  created_at?: Maybe<Scalars['timetz']>;
  downloadable_url?: Maybe<Scalars['String']>;
  file_path?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An object relationship */
  initiative?: Maybe<Initiatives>;
  initiative_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "files" */
export type Files_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Files_Max_Order_By>;
  min?: Maybe<Files_Min_Order_By>;
};

/** input type for inserting array relation for remote table "files" */
export type Files_Arr_Rel_Insert_Input = {
  data: Array<Files_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Files_On_Conflict>;
};

/** Boolean expression to filter rows from the table "files". All fields are combined with a logical 'AND'. */
export type Files_Bool_Exp = {
  _and?: Maybe<Array<Files_Bool_Exp>>;
  _not?: Maybe<Files_Bool_Exp>;
  _or?: Maybe<Array<Files_Bool_Exp>>;
  created_at?: Maybe<Timetz_Comparison_Exp>;
  downloadable_url?: Maybe<String_Comparison_Exp>;
  file_path?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  initiative?: Maybe<Initiatives_Bool_Exp>;
  initiative_id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "files" */
export enum Files_Constraint {
  /** unique or primary key constraint */
  FilesPkey = 'files_pkey'
}

/** input type for inserting data into table "files" */
export type Files_Insert_Input = {
  created_at?: Maybe<Scalars['timetz']>;
  downloadable_url?: Maybe<Scalars['String']>;
  file_path?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  initiative?: Maybe<Initiatives_Obj_Rel_Insert_Input>;
  initiative_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "files" */
export type Files_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  downloadable_url?: Maybe<Order_By>;
  file_path?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "files" */
export type Files_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  downloadable_url?: Maybe<Order_By>;
  file_path?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "files" */
export type Files_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Files>;
};

/** on conflict condition type for table "files" */
export type Files_On_Conflict = {
  constraint: Files_Constraint;
  update_columns: Array<Files_Update_Column>;
  where?: Maybe<Files_Bool_Exp>;
};

/** Ordering options when selecting data from "files". */
export type Files_Order_By = {
  created_at?: Maybe<Order_By>;
  downloadable_url?: Maybe<Order_By>;
  file_path?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative?: Maybe<Initiatives_Order_By>;
  initiative_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: files */
export type Files_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "files" */
export enum Files_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DownloadableUrl = 'downloadable_url',
  /** column name */
  FilePath = 'file_path',
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "files" */
export type Files_Set_Input = {
  created_at?: Maybe<Scalars['timetz']>;
  downloadable_url?: Maybe<Scalars['String']>;
  file_path?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "files" */
export enum Files_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DownloadableUrl = 'downloadable_url',
  /** column name */
  FilePath = 'file_path',
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  UserId = 'user_id'
}


/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: Maybe<Scalars['float8']>;
  _gt?: Maybe<Scalars['float8']>;
  _gte?: Maybe<Scalars['float8']>;
  _in?: Maybe<Array<Scalars['float8']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['float8']>;
  _lte?: Maybe<Scalars['float8']>;
  _neq?: Maybe<Scalars['float8']>;
  _nin?: Maybe<Array<Scalars['float8']>>;
};


export type Geography_Cast_Exp = {
  geometry?: Maybe<Geometry_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type Geography_Comparison_Exp = {
  _cast?: Maybe<Geography_Cast_Exp>;
  _eq?: Maybe<Scalars['geography']>;
  _gt?: Maybe<Scalars['geography']>;
  _gte?: Maybe<Scalars['geography']>;
  _in?: Maybe<Array<Scalars['geography']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geography']>;
  _lte?: Maybe<Scalars['geography']>;
  _neq?: Maybe<Scalars['geography']>;
  _nin?: Maybe<Array<Scalars['geography']>>;
  /** is the column within a given distance from the given geography value */
  _st_d_within?: Maybe<St_D_Within_Geography_Input>;
  /** does the column spatially intersect the given geography value */
  _st_intersects?: Maybe<Scalars['geography']>;
};


export type Geometry_Cast_Exp = {
  geography?: Maybe<Geography_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type Geometry_Comparison_Exp = {
  _cast?: Maybe<Geometry_Cast_Exp>;
  _eq?: Maybe<Scalars['geometry']>;
  _gt?: Maybe<Scalars['geometry']>;
  _gte?: Maybe<Scalars['geometry']>;
  _in?: Maybe<Array<Scalars['geometry']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geometry']>;
  _lte?: Maybe<Scalars['geometry']>;
  _neq?: Maybe<Scalars['geometry']>;
  _nin?: Maybe<Array<Scalars['geometry']>>;
  /** does the column contain the given geometry value */
  _st_contains?: Maybe<Scalars['geometry']>;
  /** does the column cross the given geometry value */
  _st_crosses?: Maybe<Scalars['geometry']>;
  /** is the column within a given distance from the given geometry value */
  _st_d_within?: Maybe<St_D_Within_Input>;
  /** is the column equal to given geometry value (directionality is ignored) */
  _st_equals?: Maybe<Scalars['geometry']>;
  /** does the column spatially intersect the given geometry value */
  _st_intersects?: Maybe<Scalars['geometry']>;
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _st_overlaps?: Maybe<Scalars['geometry']>;
  /** does the column have atleast one point in common with the given geometry value */
  _st_touches?: Maybe<Scalars['geometry']>;
  /** is the column contained in the given geometry value */
  _st_within?: Maybe<Scalars['geometry']>;
};

/** columns and relationships of "i18n" */
export type I18n = {
  category: Scalars['String'];
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  /** An object relationship */
  i18n_category: I18n_Categories;
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  uk?: Maybe<Scalars['String']>;
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

/** order by avg() on columns of table "i18n" */
export type I18n_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "i18n". All fields are combined with a logical 'AND'. */
export type I18n_Bool_Exp = {
  _and?: Maybe<Array<I18n_Bool_Exp>>;
  _not?: Maybe<I18n_Bool_Exp>;
  _or?: Maybe<Array<I18n_Bool_Exp>>;
  category?: Maybe<String_Comparison_Exp>;
  en?: Maybe<String_Comparison_Exp>;
  fr?: Maybe<String_Comparison_Exp>;
  i18n_category?: Maybe<I18n_Categories_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  key?: Maybe<String_Comparison_Exp>;
  uk?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "i18n_categories" */
export type I18n_Categories = {
  category: Scalars['String'];
  /** An array relationship */
  i18ns: Array<I18n>;
};


/** columns and relationships of "i18n_categories" */
export type I18n_CategoriesI18nsArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "i18n_categories". All fields are combined with a logical 'AND'. */
export type I18n_Categories_Bool_Exp = {
  _and?: Maybe<Array<I18n_Categories_Bool_Exp>>;
  _not?: Maybe<I18n_Categories_Bool_Exp>;
  _or?: Maybe<Array<I18n_Categories_Bool_Exp>>;
  category?: Maybe<String_Comparison_Exp>;
  i18ns?: Maybe<I18n_Bool_Exp>;
};

/** Ordering options when selecting data from "i18n_categories". */
export type I18n_Categories_Order_By = {
  category?: Maybe<Order_By>;
  i18ns_aggregate?: Maybe<I18n_Aggregate_Order_By>;
};

/** select columns of table "i18n_categories" */
export enum I18n_Categories_Select_Column {
  /** column name */
  Category = 'category'
}

/** order by max() on columns of table "i18n" */
export type I18n_Max_Order_By = {
  category?: Maybe<Order_By>;
  en?: Maybe<Order_By>;
  fr?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  key?: Maybe<Order_By>;
  uk?: Maybe<Order_By>;
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

/** Ordering options when selecting data from "i18n". */
export type I18n_Order_By = {
  category?: Maybe<Order_By>;
  en?: Maybe<Order_By>;
  fr?: Maybe<Order_By>;
  i18n_category?: Maybe<I18n_Categories_Order_By>;
  id?: Maybe<Order_By>;
  key?: Maybe<Order_By>;
  uk?: Maybe<Order_By>;
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

/** order by stddev() on columns of table "i18n" */
export type I18n_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "i18n" */
export type I18n_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "i18n" */
export type I18n_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "i18n" */
export type I18n_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "i18n" */
export type I18n_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "i18n" */
export type I18n_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "i18n" */
export type I18n_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "initiative_distance" */
export type Initiative_Distance = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['float8']>;
  /** An array relationship */
  files: Array<Files>;
  geom?: Maybe<Scalars['geometry']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  /** An array relationship */
  initiative_members: Array<Initiative_Members>;
  /** An aggregate relationship */
  initiative_members_aggregate: Initiative_Members_Aggregate;
  /** An array relationship */
  initiative_tags: Array<Initiative_Tags>;
  /** An array relationship */
  initiative_threads: Array<Initiative_Threads>;
  /** An array relationship */
  initiative_visits: Array<Initiative_Visits>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};


/** columns and relationships of "initiative_distance" */
export type Initiative_DistanceFilesArgs = {
  distinct_on?: Maybe<Array<Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Files_Order_By>>;
  where?: Maybe<Files_Bool_Exp>;
};


/** columns and relationships of "initiative_distance" */
export type Initiative_DistanceInitiative_MembersArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


/** columns and relationships of "initiative_distance" */
export type Initiative_DistanceInitiative_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


/** columns and relationships of "initiative_distance" */
export type Initiative_DistanceInitiative_TagsArgs = {
  distinct_on?: Maybe<Array<Initiative_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Tags_Order_By>>;
  where?: Maybe<Initiative_Tags_Bool_Exp>;
};


/** columns and relationships of "initiative_distance" */
export type Initiative_DistanceInitiative_ThreadsArgs = {
  distinct_on?: Maybe<Array<Initiative_Threads_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Threads_Order_By>>;
  where?: Maybe<Initiative_Threads_Bool_Exp>;
};


/** columns and relationships of "initiative_distance" */
export type Initiative_DistanceInitiative_VisitsArgs = {
  distinct_on?: Maybe<Array<Initiative_Visits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Visits_Order_By>>;
  where?: Maybe<Initiative_Visits_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "initiative_distance". All fields are combined with a logical 'AND'. */
export type Initiative_Distance_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Distance_Bool_Exp>>;
  _not?: Maybe<Initiative_Distance_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Distance_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  distance?: Maybe<Float8_Comparison_Exp>;
  files?: Maybe<Files_Bool_Exp>;
  geom?: Maybe<Geometry_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  initiative_members?: Maybe<Initiative_Members_Bool_Exp>;
  initiative_tags?: Maybe<Initiative_Tags_Bool_Exp>;
  initiative_threads?: Maybe<Initiative_Threads_Bool_Exp>;
  initiative_visits?: Maybe<Initiative_Visits_Bool_Exp>;
  modified_at?: Maybe<Timestamptz_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "initiative_distance". */
export type Initiative_Distance_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  distance?: Maybe<Order_By>;
  files_aggregate?: Maybe<Files_Aggregate_Order_By>;
  geom?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  initiative_members_aggregate?: Maybe<Initiative_Members_Aggregate_Order_By>;
  initiative_tags_aggregate?: Maybe<Initiative_Tags_Aggregate_Order_By>;
  initiative_threads_aggregate?: Maybe<Initiative_Threads_Aggregate_Order_By>;
  initiative_visits_aggregate?: Maybe<Initiative_Visits_Aggregate_Order_By>;
  modified_at?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "initiative_distance" */
export enum Initiative_Distance_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Distance = 'distance',
  /** column name */
  Geom = 'geom',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  ModifiedAt = 'modified_at',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "initiative_members" */
export type Initiative_Members = {
  contractor?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['timestamptz'];
  donator?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  /** An object relationship */
  initiative?: Maybe<Initiatives>;
  initiative_id?: Maybe<Scalars['uuid']>;
  initiator?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']>;
  volunteer?: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "initiative_members" */
export type Initiative_Members_Aggregate = {
  aggregate?: Maybe<Initiative_Members_Aggregate_Fields>;
  nodes: Array<Initiative_Members>;
};

/** aggregate fields of "initiative_members" */
export type Initiative_Members_Aggregate_Fields = {
  avg?: Maybe<Initiative_Members_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Initiative_Members_Max_Fields>;
  min?: Maybe<Initiative_Members_Min_Fields>;
  stddev?: Maybe<Initiative_Members_Stddev_Fields>;
  stddev_pop?: Maybe<Initiative_Members_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Initiative_Members_Stddev_Samp_Fields>;
  sum?: Maybe<Initiative_Members_Sum_Fields>;
  var_pop?: Maybe<Initiative_Members_Var_Pop_Fields>;
  var_samp?: Maybe<Initiative_Members_Var_Samp_Fields>;
  variance?: Maybe<Initiative_Members_Variance_Fields>;
};


/** aggregate fields of "initiative_members" */
export type Initiative_Members_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Initiative_Members_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "initiative_members" */
export type Initiative_Members_Aggregate_Order_By = {
  avg?: Maybe<Initiative_Members_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Initiative_Members_Max_Order_By>;
  min?: Maybe<Initiative_Members_Min_Order_By>;
  stddev?: Maybe<Initiative_Members_Stddev_Order_By>;
  stddev_pop?: Maybe<Initiative_Members_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Initiative_Members_Stddev_Samp_Order_By>;
  sum?: Maybe<Initiative_Members_Sum_Order_By>;
  var_pop?: Maybe<Initiative_Members_Var_Pop_Order_By>;
  var_samp?: Maybe<Initiative_Members_Var_Samp_Order_By>;
  variance?: Maybe<Initiative_Members_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "initiative_members" */
export type Initiative_Members_Arr_Rel_Insert_Input = {
  data: Array<Initiative_Members_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Members_On_Conflict>;
};

/** aggregate avg on columns */
export type Initiative_Members_Avg_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "initiative_members" */
export type Initiative_Members_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "initiative_members". All fields are combined with a logical 'AND'. */
export type Initiative_Members_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Members_Bool_Exp>>;
  _not?: Maybe<Initiative_Members_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Members_Bool_Exp>>;
  contractor?: Maybe<Boolean_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  donator?: Maybe<Boolean_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  initiative?: Maybe<Initiatives_Bool_Exp>;
  initiative_id?: Maybe<Uuid_Comparison_Exp>;
  initiator?: Maybe<Boolean_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
  volunteer?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "initiative_members" */
export enum Initiative_Members_Constraint {
  /** unique or primary key constraint */
  InitiativeMemberPkey = 'initiative_member_pkey'
}

/** input type for incrementing numeric columns in table "initiative_members" */
export type Initiative_Members_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "initiative_members" */
export type Initiative_Members_Insert_Input = {
  contractor?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  donator?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  initiative?: Maybe<Initiatives_Obj_Rel_Insert_Input>;
  initiative_id?: Maybe<Scalars['uuid']>;
  initiator?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['uuid']>;
  volunteer?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Initiative_Members_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "initiative_members" */
export type Initiative_Members_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Initiative_Members_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "initiative_members" */
export type Initiative_Members_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "initiative_members" */
export type Initiative_Members_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiative_Members>;
};

/** on conflict condition type for table "initiative_members" */
export type Initiative_Members_On_Conflict = {
  constraint: Initiative_Members_Constraint;
  update_columns: Array<Initiative_Members_Update_Column>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};

/** Ordering options when selecting data from "initiative_members". */
export type Initiative_Members_Order_By = {
  contractor?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  donator?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative?: Maybe<Initiatives_Order_By>;
  initiative_id?: Maybe<Order_By>;
  initiator?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
  volunteer?: Maybe<Order_By>;
};

/** primary key columns input for table: initiative_members */
export type Initiative_Members_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "initiative_members" */
export enum Initiative_Members_Select_Column {
  /** column name */
  Contractor = 'contractor',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Donator = 'donator',
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  Initiator = 'initiator',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Volunteer = 'volunteer'
}

/** input type for updating data in table "initiative_members" */
export type Initiative_Members_Set_Input = {
  contractor?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  donator?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  initiator?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['uuid']>;
  volunteer?: Maybe<Scalars['Boolean']>;
};

/** aggregate stddev on columns */
export type Initiative_Members_Stddev_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "initiative_members" */
export type Initiative_Members_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Initiative_Members_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "initiative_members" */
export type Initiative_Members_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Initiative_Members_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "initiative_members" */
export type Initiative_Members_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Initiative_Members_Sum_Fields = {
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "initiative_members" */
export type Initiative_Members_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "initiative_members" */
export enum Initiative_Members_Update_Column {
  /** column name */
  Contractor = 'contractor',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Donator = 'donator',
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  Initiator = 'initiator',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Volunteer = 'volunteer'
}

/** aggregate var_pop on columns */
export type Initiative_Members_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "initiative_members" */
export type Initiative_Members_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Initiative_Members_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "initiative_members" */
export type Initiative_Members_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Initiative_Members_Variance_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "initiative_members" */
export type Initiative_Members_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "initiative_tags" */
export type Initiative_Tags = {
  id: Scalars['Int'];
  /** An object relationship */
  initiative?: Maybe<Initiatives>;
  initiative_id?: Maybe<Scalars['uuid']>;
  tag?: Maybe<Scalars['String']>;
  /** An object relationship */
  tagByTag?: Maybe<Tags>;
};

/** order by aggregate values of table "initiative_tags" */
export type Initiative_Tags_Aggregate_Order_By = {
  avg?: Maybe<Initiative_Tags_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Initiative_Tags_Max_Order_By>;
  min?: Maybe<Initiative_Tags_Min_Order_By>;
  stddev?: Maybe<Initiative_Tags_Stddev_Order_By>;
  stddev_pop?: Maybe<Initiative_Tags_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Initiative_Tags_Stddev_Samp_Order_By>;
  sum?: Maybe<Initiative_Tags_Sum_Order_By>;
  var_pop?: Maybe<Initiative_Tags_Var_Pop_Order_By>;
  var_samp?: Maybe<Initiative_Tags_Var_Samp_Order_By>;
  variance?: Maybe<Initiative_Tags_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "initiative_tags" */
export type Initiative_Tags_Arr_Rel_Insert_Input = {
  data: Array<Initiative_Tags_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Tags_On_Conflict>;
};

/** order by avg() on columns of table "initiative_tags" */
export type Initiative_Tags_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "initiative_tags". All fields are combined with a logical 'AND'. */
export type Initiative_Tags_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Tags_Bool_Exp>>;
  _not?: Maybe<Initiative_Tags_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Tags_Bool_Exp>>;
  id?: Maybe<Int_Comparison_Exp>;
  initiative?: Maybe<Initiatives_Bool_Exp>;
  initiative_id?: Maybe<Uuid_Comparison_Exp>;
  tag?: Maybe<String_Comparison_Exp>;
  tagByTag?: Maybe<Tags_Bool_Exp>;
};

/** unique or primary key constraints on table "initiative_tags" */
export enum Initiative_Tags_Constraint {
  /** unique or primary key constraint */
  InitiativeTagPkey = 'initiative_tag_pkey'
}

/** input type for incrementing numeric columns in table "initiative_tags" */
export type Initiative_Tags_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "initiative_tags" */
export type Initiative_Tags_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  initiative?: Maybe<Initiatives_Obj_Rel_Insert_Input>;
  initiative_id?: Maybe<Scalars['uuid']>;
  tag?: Maybe<Scalars['String']>;
  tagByTag?: Maybe<Tags_Obj_Rel_Insert_Input>;
};

/** order by max() on columns of table "initiative_tags" */
export type Initiative_Tags_Max_Order_By = {
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  tag?: Maybe<Order_By>;
};

/** order by min() on columns of table "initiative_tags" */
export type Initiative_Tags_Min_Order_By = {
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  tag?: Maybe<Order_By>;
};

/** response of any mutation on the table "initiative_tags" */
export type Initiative_Tags_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiative_Tags>;
};

/** on conflict condition type for table "initiative_tags" */
export type Initiative_Tags_On_Conflict = {
  constraint: Initiative_Tags_Constraint;
  update_columns: Array<Initiative_Tags_Update_Column>;
  where?: Maybe<Initiative_Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "initiative_tags". */
export type Initiative_Tags_Order_By = {
  id?: Maybe<Order_By>;
  initiative?: Maybe<Initiatives_Order_By>;
  initiative_id?: Maybe<Order_By>;
  tag?: Maybe<Order_By>;
  tagByTag?: Maybe<Tags_Order_By>;
};

/** primary key columns input for table: initiative_tags */
export type Initiative_Tags_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "initiative_tags" */
export enum Initiative_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  Tag = 'tag'
}

/** input type for updating data in table "initiative_tags" */
export type Initiative_Tags_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  tag?: Maybe<Scalars['String']>;
};

/** order by stddev() on columns of table "initiative_tags" */
export type Initiative_Tags_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "initiative_tags" */
export type Initiative_Tags_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "initiative_tags" */
export type Initiative_Tags_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "initiative_tags" */
export type Initiative_Tags_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "initiative_tags" */
export enum Initiative_Tags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  Tag = 'tag'
}

/** order by var_pop() on columns of table "initiative_tags" */
export type Initiative_Tags_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "initiative_tags" */
export type Initiative_Tags_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "initiative_tags" */
export type Initiative_Tags_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "initiative_thread_comments" */
export type Initiative_Thread_Comments = {
  comment?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  initiative_thread_message: Initiative_Thread_Messages;
  message_id: Scalars['Int'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Aggregate_Order_By = {
  avg?: Maybe<Initiative_Thread_Comments_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Initiative_Thread_Comments_Max_Order_By>;
  min?: Maybe<Initiative_Thread_Comments_Min_Order_By>;
  stddev?: Maybe<Initiative_Thread_Comments_Stddev_Order_By>;
  stddev_pop?: Maybe<Initiative_Thread_Comments_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Initiative_Thread_Comments_Stddev_Samp_Order_By>;
  sum?: Maybe<Initiative_Thread_Comments_Sum_Order_By>;
  var_pop?: Maybe<Initiative_Thread_Comments_Var_Pop_Order_By>;
  var_samp?: Maybe<Initiative_Thread_Comments_Var_Samp_Order_By>;
  variance?: Maybe<Initiative_Thread_Comments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Arr_Rel_Insert_Input = {
  data: Array<Initiative_Thread_Comments_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Thread_Comments_On_Conflict>;
};

/** order by avg() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Avg_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "initiative_thread_comments". All fields are combined with a logical 'AND'. */
export type Initiative_Thread_Comments_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Thread_Comments_Bool_Exp>>;
  _not?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Thread_Comments_Bool_Exp>>;
  comment?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  initiative_thread_message?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
  message_id?: Maybe<Int_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "initiative_thread_comments" */
export enum Initiative_Thread_Comments_Constraint {
  /** unique or primary key constraint */
  InitiativeThreadCommentPkey = 'initiative_thread_comment_pkey'
}

/** input type for incrementing numeric columns in table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Insert_Input = {
  comment?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  initiative_thread_message?: Maybe<Initiative_Thread_Messages_Obj_Rel_Insert_Input>;
  message_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Max_Order_By = {
  comment?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Min_Order_By = {
  comment?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiative_Thread_Comments>;
};

/** on conflict condition type for table "initiative_thread_comments" */
export type Initiative_Thread_Comments_On_Conflict = {
  constraint: Initiative_Thread_Comments_Constraint;
  update_columns: Array<Initiative_Thread_Comments_Update_Column>;
  where?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "initiative_thread_comments". */
export type Initiative_Thread_Comments_Order_By = {
  comment?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_thread_message?: Maybe<Initiative_Thread_Messages_Order_By>;
  message_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: initiative_thread_comments */
export type Initiative_Thread_Comments_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "initiative_thread_comments" */
export enum Initiative_Thread_Comments_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  MessageId = 'message_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Set_Input = {
  comment?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  message_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by stddev() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Sum_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** update columns of table "initiative_thread_comments" */
export enum Initiative_Thread_Comments_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  MessageId = 'message_id',
  /** column name */
  UserId = 'user_id'
}

/** order by var_pop() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "initiative_thread_comments" */
export type Initiative_Thread_Comments_Variance_Order_By = {
  id?: Maybe<Order_By>;
  message_id?: Maybe<Order_By>;
};

/** columns and relationships of "initiative_thread_messages" */
export type Initiative_Thread_Messages = {
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  initiative_thread: Initiative_Threads;
  /** An array relationship */
  initiative_thread_comments: Array<Initiative_Thread_Comments>;
  message?: Maybe<Scalars['String']>;
  tender_id?: Maybe<Scalars['uuid']>;
  thread_id: Scalars['Int'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "initiative_thread_messages" */
export type Initiative_Thread_MessagesInitiative_Thread_CommentsArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Comments_Order_By>>;
  where?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
};

/** order by aggregate values of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Aggregate_Order_By = {
  avg?: Maybe<Initiative_Thread_Messages_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Initiative_Thread_Messages_Max_Order_By>;
  min?: Maybe<Initiative_Thread_Messages_Min_Order_By>;
  stddev?: Maybe<Initiative_Thread_Messages_Stddev_Order_By>;
  stddev_pop?: Maybe<Initiative_Thread_Messages_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Initiative_Thread_Messages_Stddev_Samp_Order_By>;
  sum?: Maybe<Initiative_Thread_Messages_Sum_Order_By>;
  var_pop?: Maybe<Initiative_Thread_Messages_Var_Pop_Order_By>;
  var_samp?: Maybe<Initiative_Thread_Messages_Var_Samp_Order_By>;
  variance?: Maybe<Initiative_Thread_Messages_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Arr_Rel_Insert_Input = {
  data: Array<Initiative_Thread_Messages_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Thread_Messages_On_Conflict>;
};

/** order by avg() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Avg_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "initiative_thread_messages". All fields are combined with a logical 'AND'. */
export type Initiative_Thread_Messages_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Thread_Messages_Bool_Exp>>;
  _not?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Thread_Messages_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  initiative_thread?: Maybe<Initiative_Threads_Bool_Exp>;
  initiative_thread_comments?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
  message?: Maybe<String_Comparison_Exp>;
  tender_id?: Maybe<Uuid_Comparison_Exp>;
  thread_id?: Maybe<Int_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "initiative_thread_messages" */
export enum Initiative_Thread_Messages_Constraint {
  /** unique or primary key constraint */
  InitiativeThreadMessagePkey = 'initiative_thread_message_pkey'
}

/** input type for incrementing numeric columns in table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  thread_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  initiative_thread?: Maybe<Initiative_Threads_Obj_Rel_Insert_Input>;
  initiative_thread_comments?: Maybe<Initiative_Thread_Comments_Arr_Rel_Insert_Input>;
  message?: Maybe<Scalars['String']>;
  tender_id?: Maybe<Scalars['uuid']>;
  thread_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  tender_id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  tender_id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiative_Thread_Messages>;
};

/** input type for inserting object relation for remote table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Obj_Rel_Insert_Input = {
  data: Initiative_Thread_Messages_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Thread_Messages_On_Conflict>;
};

/** on conflict condition type for table "initiative_thread_messages" */
export type Initiative_Thread_Messages_On_Conflict = {
  constraint: Initiative_Thread_Messages_Constraint;
  update_columns: Array<Initiative_Thread_Messages_Update_Column>;
  where?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "initiative_thread_messages". */
export type Initiative_Thread_Messages_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_thread?: Maybe<Initiative_Threads_Order_By>;
  initiative_thread_comments_aggregate?: Maybe<Initiative_Thread_Comments_Aggregate_Order_By>;
  message?: Maybe<Order_By>;
  tender_id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: initiative_thread_messages */
export type Initiative_Thread_Messages_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "initiative_thread_messages" */
export enum Initiative_Thread_Messages_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  TenderId = 'tender_id',
  /** column name */
  ThreadId = 'thread_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  tender_id?: Maybe<Scalars['uuid']>;
  thread_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by stddev() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Sum_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** update columns of table "initiative_thread_messages" */
export enum Initiative_Thread_Messages_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  TenderId = 'tender_id',
  /** column name */
  ThreadId = 'thread_id',
  /** column name */
  UserId = 'user_id'
}

/** order by var_pop() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "initiative_thread_messages" */
export type Initiative_Thread_Messages_Variance_Order_By = {
  id?: Maybe<Order_By>;
  thread_id?: Maybe<Order_By>;
};

/** columns and relationships of "initiative_threads" */
export type Initiative_Threads = {
  context?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  goal?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  initiative?: Maybe<Initiatives>;
  initiative_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  initiative_thread_messages: Array<Initiative_Thread_Messages>;
  problem?: Maybe<Scalars['String']>;
};


/** columns and relationships of "initiative_threads" */
export type Initiative_ThreadsInitiative_Thread_MessagesArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Messages_Order_By>>;
  where?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
};

/** order by aggregate values of table "initiative_threads" */
export type Initiative_Threads_Aggregate_Order_By = {
  avg?: Maybe<Initiative_Threads_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Initiative_Threads_Max_Order_By>;
  min?: Maybe<Initiative_Threads_Min_Order_By>;
  stddev?: Maybe<Initiative_Threads_Stddev_Order_By>;
  stddev_pop?: Maybe<Initiative_Threads_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Initiative_Threads_Stddev_Samp_Order_By>;
  sum?: Maybe<Initiative_Threads_Sum_Order_By>;
  var_pop?: Maybe<Initiative_Threads_Var_Pop_Order_By>;
  var_samp?: Maybe<Initiative_Threads_Var_Samp_Order_By>;
  variance?: Maybe<Initiative_Threads_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "initiative_threads" */
export type Initiative_Threads_Arr_Rel_Insert_Input = {
  data: Array<Initiative_Threads_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Threads_On_Conflict>;
};

/** order by avg() on columns of table "initiative_threads" */
export type Initiative_Threads_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "initiative_threads". All fields are combined with a logical 'AND'. */
export type Initiative_Threads_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Threads_Bool_Exp>>;
  _not?: Maybe<Initiative_Threads_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Threads_Bool_Exp>>;
  context?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  goal?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  initiative?: Maybe<Initiatives_Bool_Exp>;
  initiative_id?: Maybe<Uuid_Comparison_Exp>;
  initiative_thread_messages?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
  problem?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "initiative_threads" */
export enum Initiative_Threads_Constraint {
  /** unique or primary key constraint */
  InitiativeThreadPkey = 'initiative_thread_pkey'
}

/** input type for incrementing numeric columns in table "initiative_threads" */
export type Initiative_Threads_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "initiative_threads" */
export type Initiative_Threads_Insert_Input = {
  context?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  goal?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  initiative?: Maybe<Initiatives_Obj_Rel_Insert_Input>;
  initiative_id?: Maybe<Scalars['uuid']>;
  initiative_thread_messages?: Maybe<Initiative_Thread_Messages_Arr_Rel_Insert_Input>;
  problem?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "initiative_threads" */
export type Initiative_Threads_Max_Order_By = {
  context?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  goal?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  problem?: Maybe<Order_By>;
};

/** order by min() on columns of table "initiative_threads" */
export type Initiative_Threads_Min_Order_By = {
  context?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  goal?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  problem?: Maybe<Order_By>;
};

/** response of any mutation on the table "initiative_threads" */
export type Initiative_Threads_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiative_Threads>;
};

/** input type for inserting object relation for remote table "initiative_threads" */
export type Initiative_Threads_Obj_Rel_Insert_Input = {
  data: Initiative_Threads_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Threads_On_Conflict>;
};

/** on conflict condition type for table "initiative_threads" */
export type Initiative_Threads_On_Conflict = {
  constraint: Initiative_Threads_Constraint;
  update_columns: Array<Initiative_Threads_Update_Column>;
  where?: Maybe<Initiative_Threads_Bool_Exp>;
};

/** Ordering options when selecting data from "initiative_threads". */
export type Initiative_Threads_Order_By = {
  context?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  goal?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiative?: Maybe<Initiatives_Order_By>;
  initiative_id?: Maybe<Order_By>;
  initiative_thread_messages_aggregate?: Maybe<Initiative_Thread_Messages_Aggregate_Order_By>;
  problem?: Maybe<Order_By>;
};

/** primary key columns input for table: initiative_threads */
export type Initiative_Threads_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "initiative_threads" */
export enum Initiative_Threads_Select_Column {
  /** column name */
  Context = 'context',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Goal = 'goal',
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  Problem = 'problem'
}

/** input type for updating data in table "initiative_threads" */
export type Initiative_Threads_Set_Input = {
  context?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  goal?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  problem?: Maybe<Scalars['String']>;
};

/** order by stddev() on columns of table "initiative_threads" */
export type Initiative_Threads_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "initiative_threads" */
export type Initiative_Threads_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "initiative_threads" */
export type Initiative_Threads_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "initiative_threads" */
export type Initiative_Threads_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "initiative_threads" */
export enum Initiative_Threads_Update_Column {
  /** column name */
  Context = 'context',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Goal = 'goal',
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  Problem = 'problem'
}

/** order by var_pop() on columns of table "initiative_threads" */
export type Initiative_Threads_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "initiative_threads" */
export type Initiative_Threads_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "initiative_threads" */
export type Initiative_Threads_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "initiative_visits" */
export type Initiative_Visits = {
  id: Scalars['bigint'];
  /** An object relationship */
  initiative: Initiatives;
  initiative_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
  visited_at?: Maybe<Scalars['timestamptz']>;
};

/** order by aggregate values of table "initiative_visits" */
export type Initiative_Visits_Aggregate_Order_By = {
  avg?: Maybe<Initiative_Visits_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Initiative_Visits_Max_Order_By>;
  min?: Maybe<Initiative_Visits_Min_Order_By>;
  stddev?: Maybe<Initiative_Visits_Stddev_Order_By>;
  stddev_pop?: Maybe<Initiative_Visits_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Initiative_Visits_Stddev_Samp_Order_By>;
  sum?: Maybe<Initiative_Visits_Sum_Order_By>;
  var_pop?: Maybe<Initiative_Visits_Var_Pop_Order_By>;
  var_samp?: Maybe<Initiative_Visits_Var_Samp_Order_By>;
  variance?: Maybe<Initiative_Visits_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "initiative_visits" */
export type Initiative_Visits_Arr_Rel_Insert_Input = {
  data: Array<Initiative_Visits_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Initiative_Visits_On_Conflict>;
};

/** order by avg() on columns of table "initiative_visits" */
export type Initiative_Visits_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "initiative_visits". All fields are combined with a logical 'AND'. */
export type Initiative_Visits_Bool_Exp = {
  _and?: Maybe<Array<Initiative_Visits_Bool_Exp>>;
  _not?: Maybe<Initiative_Visits_Bool_Exp>;
  _or?: Maybe<Array<Initiative_Visits_Bool_Exp>>;
  id?: Maybe<Bigint_Comparison_Exp>;
  initiative?: Maybe<Initiatives_Bool_Exp>;
  initiative_id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
  visited_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "initiative_visits" */
export enum Initiative_Visits_Constraint {
  /** unique or primary key constraint */
  InitiativeVisitsPkey = 'initiative_visits_pkey',
  /** unique or primary key constraint */
  UserInitiativeConstraint = 'user_initiative_constraint'
}

/** input type for incrementing numeric columns in table "initiative_visits" */
export type Initiative_Visits_Inc_Input = {
  id?: Maybe<Scalars['bigint']>;
};

/** input type for inserting data into table "initiative_visits" */
export type Initiative_Visits_Insert_Input = {
  id?: Maybe<Scalars['bigint']>;
  initiative?: Maybe<Initiatives_Obj_Rel_Insert_Input>;
  initiative_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
  visited_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "initiative_visits" */
export type Initiative_Visits_Max_Order_By = {
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  visited_at?: Maybe<Order_By>;
};

/** order by min() on columns of table "initiative_visits" */
export type Initiative_Visits_Min_Order_By = {
  id?: Maybe<Order_By>;
  initiative_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  visited_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "initiative_visits" */
export type Initiative_Visits_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiative_Visits>;
};

/** on conflict condition type for table "initiative_visits" */
export type Initiative_Visits_On_Conflict = {
  constraint: Initiative_Visits_Constraint;
  update_columns: Array<Initiative_Visits_Update_Column>;
  where?: Maybe<Initiative_Visits_Bool_Exp>;
};

/** Ordering options when selecting data from "initiative_visits". */
export type Initiative_Visits_Order_By = {
  id?: Maybe<Order_By>;
  initiative?: Maybe<Initiatives_Order_By>;
  initiative_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
  visited_at?: Maybe<Order_By>;
};

/** primary key columns input for table: initiative_visits */
export type Initiative_Visits_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "initiative_visits" */
export enum Initiative_Visits_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VisitedAt = 'visited_at'
}

/** input type for updating data in table "initiative_visits" */
export type Initiative_Visits_Set_Input = {
  id?: Maybe<Scalars['bigint']>;
  initiative_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
  visited_at?: Maybe<Scalars['timestamptz']>;
};

/** order by stddev() on columns of table "initiative_visits" */
export type Initiative_Visits_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "initiative_visits" */
export type Initiative_Visits_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "initiative_visits" */
export type Initiative_Visits_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "initiative_visits" */
export type Initiative_Visits_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "initiative_visits" */
export enum Initiative_Visits_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  InitiativeId = 'initiative_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VisitedAt = 'visited_at'
}

/** order by var_pop() on columns of table "initiative_visits" */
export type Initiative_Visits_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "initiative_visits" */
export type Initiative_Visits_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "initiative_visits" */
export type Initiative_Visits_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "initiatives" */
export type Initiatives = {
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  /** An array relationship */
  files: Array<Files>;
  geom?: Maybe<Scalars['geometry']>;
  id: Scalars['uuid'];
  image?: Maybe<Scalars['String']>;
  /** An array relationship */
  initiative_members: Array<Initiative_Members>;
  /** An aggregate relationship */
  initiative_members_aggregate: Initiative_Members_Aggregate;
  /** An array relationship */
  initiative_tags: Array<Initiative_Tags>;
  /** An array relationship */
  initiative_threads: Array<Initiative_Threads>;
  /** An array relationship */
  initiative_visits: Array<Initiative_Visits>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};


/** columns and relationships of "initiatives" */
export type InitiativesFilesArgs = {
  distinct_on?: Maybe<Array<Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Files_Order_By>>;
  where?: Maybe<Files_Bool_Exp>;
};


/** columns and relationships of "initiatives" */
export type InitiativesInitiative_MembersArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


/** columns and relationships of "initiatives" */
export type InitiativesInitiative_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


/** columns and relationships of "initiatives" */
export type InitiativesInitiative_TagsArgs = {
  distinct_on?: Maybe<Array<Initiative_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Tags_Order_By>>;
  where?: Maybe<Initiative_Tags_Bool_Exp>;
};


/** columns and relationships of "initiatives" */
export type InitiativesInitiative_ThreadsArgs = {
  distinct_on?: Maybe<Array<Initiative_Threads_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Threads_Order_By>>;
  where?: Maybe<Initiative_Threads_Bool_Exp>;
};


/** columns and relationships of "initiatives" */
export type InitiativesInitiative_VisitsArgs = {
  distinct_on?: Maybe<Array<Initiative_Visits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Visits_Order_By>>;
  where?: Maybe<Initiative_Visits_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "initiatives". All fields are combined with a logical 'AND'. */
export type Initiatives_Bool_Exp = {
  _and?: Maybe<Array<Initiatives_Bool_Exp>>;
  _not?: Maybe<Initiatives_Bool_Exp>;
  _or?: Maybe<Array<Initiatives_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  files?: Maybe<Files_Bool_Exp>;
  geom?: Maybe<Geometry_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  initiative_members?: Maybe<Initiative_Members_Bool_Exp>;
  initiative_tags?: Maybe<Initiative_Tags_Bool_Exp>;
  initiative_threads?: Maybe<Initiative_Threads_Bool_Exp>;
  initiative_visits?: Maybe<Initiative_Visits_Bool_Exp>;
  modified_at?: Maybe<Timestamptz_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "initiatives" */
export enum Initiatives_Constraint {
  /** unique or primary key constraint */
  InitiativePkey = 'initiative__pkey'
}

/** input type for inserting data into table "initiatives" */
export type Initiatives_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  files?: Maybe<Files_Arr_Rel_Insert_Input>;
  geom?: Maybe<Scalars['geometry']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  initiative_members?: Maybe<Initiative_Members_Arr_Rel_Insert_Input>;
  initiative_tags?: Maybe<Initiative_Tags_Arr_Rel_Insert_Input>;
  initiative_threads?: Maybe<Initiative_Threads_Arr_Rel_Insert_Input>;
  initiative_visits?: Maybe<Initiative_Visits_Arr_Rel_Insert_Input>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "initiatives" */
export type Initiatives_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Initiatives>;
};

export type Initiatives_Nearby_Args = {
  limit?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['geometry']>;
  max_date?: Maybe<Scalars['timestamptz']>;
  max_distance?: Maybe<Scalars['float8']>;
  min_date?: Maybe<Scalars['timestamptz']>;
  min_distance?: Maybe<Scalars['float8']>;
  own?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** input type for inserting object relation for remote table "initiatives" */
export type Initiatives_Obj_Rel_Insert_Input = {
  data: Initiatives_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Initiatives_On_Conflict>;
};

/** on conflict condition type for table "initiatives" */
export type Initiatives_On_Conflict = {
  constraint: Initiatives_Constraint;
  update_columns: Array<Initiatives_Update_Column>;
  where?: Maybe<Initiatives_Bool_Exp>;
};

/** Ordering options when selecting data from "initiatives". */
export type Initiatives_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  files_aggregate?: Maybe<Files_Aggregate_Order_By>;
  geom?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  initiative_members_aggregate?: Maybe<Initiative_Members_Aggregate_Order_By>;
  initiative_tags_aggregate?: Maybe<Initiative_Tags_Aggregate_Order_By>;
  initiative_threads_aggregate?: Maybe<Initiative_Threads_Aggregate_Order_By>;
  initiative_visits_aggregate?: Maybe<Initiative_Visits_Aggregate_Order_By>;
  modified_at?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: initiatives */
export type Initiatives_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "initiatives" */
export enum Initiatives_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Geom = 'geom',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  ModifiedAt = 'modified_at',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "initiatives" */
export type Initiatives_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['geometry']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "initiatives" */
export enum Initiatives_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Geom = 'geom',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  ModifiedAt = 'modified_at',
  /** column name */
  Name = 'name'
}

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "files" */
  delete_files?: Maybe<Files_Mutation_Response>;
  /** delete single row from the table: "files" */
  delete_files_by_pk?: Maybe<Files>;
  /** delete data from the table: "initiative_members" */
  delete_initiative_members?: Maybe<Initiative_Members_Mutation_Response>;
  /** delete single row from the table: "initiative_members" */
  delete_initiative_members_by_pk?: Maybe<Initiative_Members>;
  /** delete data from the table: "initiative_tags" */
  delete_initiative_tags?: Maybe<Initiative_Tags_Mutation_Response>;
  /** delete single row from the table: "initiative_tags" */
  delete_initiative_tags_by_pk?: Maybe<Initiative_Tags>;
  /** delete data from the table: "initiative_thread_comments" */
  delete_initiative_thread_comments?: Maybe<Initiative_Thread_Comments_Mutation_Response>;
  /** delete single row from the table: "initiative_thread_comments" */
  delete_initiative_thread_comments_by_pk?: Maybe<Initiative_Thread_Comments>;
  /** delete data from the table: "initiative_thread_messages" */
  delete_initiative_thread_messages?: Maybe<Initiative_Thread_Messages_Mutation_Response>;
  /** delete single row from the table: "initiative_thread_messages" */
  delete_initiative_thread_messages_by_pk?: Maybe<Initiative_Thread_Messages>;
  /** delete data from the table: "initiative_threads" */
  delete_initiative_threads?: Maybe<Initiative_Threads_Mutation_Response>;
  /** delete single row from the table: "initiative_threads" */
  delete_initiative_threads_by_pk?: Maybe<Initiative_Threads>;
  /** delete data from the table: "initiative_visits" */
  delete_initiative_visits?: Maybe<Initiative_Visits_Mutation_Response>;
  /** delete single row from the table: "initiative_visits" */
  delete_initiative_visits_by_pk?: Maybe<Initiative_Visits>;
  /** delete data from the table: "initiatives" */
  delete_initiatives?: Maybe<Initiatives_Mutation_Response>;
  /** delete single row from the table: "initiatives" */
  delete_initiatives_by_pk?: Maybe<Initiatives>;
  /** insert data into the table: "files" */
  insert_files?: Maybe<Files_Mutation_Response>;
  /** insert a single row into the table: "files" */
  insert_files_one?: Maybe<Files>;
  /** insert data into the table: "initiative_members" */
  insert_initiative_members?: Maybe<Initiative_Members_Mutation_Response>;
  /** insert a single row into the table: "initiative_members" */
  insert_initiative_members_one?: Maybe<Initiative_Members>;
  /** insert data into the table: "initiative_tags" */
  insert_initiative_tags?: Maybe<Initiative_Tags_Mutation_Response>;
  /** insert a single row into the table: "initiative_tags" */
  insert_initiative_tags_one?: Maybe<Initiative_Tags>;
  /** insert data into the table: "initiative_thread_comments" */
  insert_initiative_thread_comments?: Maybe<Initiative_Thread_Comments_Mutation_Response>;
  /** insert a single row into the table: "initiative_thread_comments" */
  insert_initiative_thread_comments_one?: Maybe<Initiative_Thread_Comments>;
  /** insert data into the table: "initiative_thread_messages" */
  insert_initiative_thread_messages?: Maybe<Initiative_Thread_Messages_Mutation_Response>;
  /** insert a single row into the table: "initiative_thread_messages" */
  insert_initiative_thread_messages_one?: Maybe<Initiative_Thread_Messages>;
  /** insert data into the table: "initiative_threads" */
  insert_initiative_threads?: Maybe<Initiative_Threads_Mutation_Response>;
  /** insert a single row into the table: "initiative_threads" */
  insert_initiative_threads_one?: Maybe<Initiative_Threads>;
  /** insert data into the table: "initiative_visits" */
  insert_initiative_visits?: Maybe<Initiative_Visits_Mutation_Response>;
  /** insert a single row into the table: "initiative_visits" */
  insert_initiative_visits_one?: Maybe<Initiative_Visits>;
  /** insert data into the table: "initiatives" */
  insert_initiatives?: Maybe<Initiatives_Mutation_Response>;
  /** insert a single row into the table: "initiatives" */
  insert_initiatives_one?: Maybe<Initiatives>;
  /** insert data into the table: "tags" */
  insert_tags?: Maybe<Tags_Mutation_Response>;
  /** insert a single row into the table: "tags" */
  insert_tags_one?: Maybe<Tags>;
  /** update data of the table: "files" */
  update_files?: Maybe<Files_Mutation_Response>;
  /** update single row of the table: "files" */
  update_files_by_pk?: Maybe<Files>;
  /** update data of the table: "initiative_members" */
  update_initiative_members?: Maybe<Initiative_Members_Mutation_Response>;
  /** update single row of the table: "initiative_members" */
  update_initiative_members_by_pk?: Maybe<Initiative_Members>;
  /** update data of the table: "initiative_tags" */
  update_initiative_tags?: Maybe<Initiative_Tags_Mutation_Response>;
  /** update single row of the table: "initiative_tags" */
  update_initiative_tags_by_pk?: Maybe<Initiative_Tags>;
  /** update data of the table: "initiative_thread_comments" */
  update_initiative_thread_comments?: Maybe<Initiative_Thread_Comments_Mutation_Response>;
  /** update single row of the table: "initiative_thread_comments" */
  update_initiative_thread_comments_by_pk?: Maybe<Initiative_Thread_Comments>;
  /** update data of the table: "initiative_thread_messages" */
  update_initiative_thread_messages?: Maybe<Initiative_Thread_Messages_Mutation_Response>;
  /** update single row of the table: "initiative_thread_messages" */
  update_initiative_thread_messages_by_pk?: Maybe<Initiative_Thread_Messages>;
  /** update data of the table: "initiative_threads" */
  update_initiative_threads?: Maybe<Initiative_Threads_Mutation_Response>;
  /** update single row of the table: "initiative_threads" */
  update_initiative_threads_by_pk?: Maybe<Initiative_Threads>;
  /** update data of the table: "initiative_visits" */
  update_initiative_visits?: Maybe<Initiative_Visits_Mutation_Response>;
  /** update single row of the table: "initiative_visits" */
  update_initiative_visits_by_pk?: Maybe<Initiative_Visits>;
  /** update data of the table: "initiatives" */
  update_initiatives?: Maybe<Initiatives_Mutation_Response>;
  /** update single row of the table: "initiatives" */
  update_initiatives_by_pk?: Maybe<Initiatives>;
};


/** mutation root */
export type Mutation_RootDelete_FilesArgs = {
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Initiative_MembersArgs = {
  where: Initiative_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Members_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Initiative_TagsArgs = {
  where: Initiative_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Thread_CommentsArgs = {
  where: Initiative_Thread_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Thread_Comments_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Thread_MessagesArgs = {
  where: Initiative_Thread_Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Thread_Messages_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Initiative_ThreadsArgs = {
  where: Initiative_Threads_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Threads_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Initiative_VisitsArgs = {
  where: Initiative_Visits_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiative_Visits_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_InitiativesArgs = {
  where: Initiatives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Initiatives_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_FilesArgs = {
  objects: Array<Files_Insert_Input>;
  on_conflict?: Maybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Files_OneArgs = {
  object: Files_Insert_Input;
  on_conflict?: Maybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_MembersArgs = {
  objects: Array<Initiative_Members_Insert_Input>;
  on_conflict?: Maybe<Initiative_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Members_OneArgs = {
  object: Initiative_Members_Insert_Input;
  on_conflict?: Maybe<Initiative_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_TagsArgs = {
  objects: Array<Initiative_Tags_Insert_Input>;
  on_conflict?: Maybe<Initiative_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Tags_OneArgs = {
  object: Initiative_Tags_Insert_Input;
  on_conflict?: Maybe<Initiative_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Thread_CommentsArgs = {
  objects: Array<Initiative_Thread_Comments_Insert_Input>;
  on_conflict?: Maybe<Initiative_Thread_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Thread_Comments_OneArgs = {
  object: Initiative_Thread_Comments_Insert_Input;
  on_conflict?: Maybe<Initiative_Thread_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Thread_MessagesArgs = {
  objects: Array<Initiative_Thread_Messages_Insert_Input>;
  on_conflict?: Maybe<Initiative_Thread_Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Thread_Messages_OneArgs = {
  object: Initiative_Thread_Messages_Insert_Input;
  on_conflict?: Maybe<Initiative_Thread_Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_ThreadsArgs = {
  objects: Array<Initiative_Threads_Insert_Input>;
  on_conflict?: Maybe<Initiative_Threads_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Threads_OneArgs = {
  object: Initiative_Threads_Insert_Input;
  on_conflict?: Maybe<Initiative_Threads_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_VisitsArgs = {
  objects: Array<Initiative_Visits_Insert_Input>;
  on_conflict?: Maybe<Initiative_Visits_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiative_Visits_OneArgs = {
  object: Initiative_Visits_Insert_Input;
  on_conflict?: Maybe<Initiative_Visits_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InitiativesArgs = {
  objects: Array<Initiatives_Insert_Input>;
  on_conflict?: Maybe<Initiatives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Initiatives_OneArgs = {
  object: Initiatives_Insert_Input;
  on_conflict?: Maybe<Initiatives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TagsArgs = {
  objects: Array<Tags_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Tags_OneArgs = {
  object: Tags_Insert_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FilesArgs = {
  _set?: Maybe<Files_Set_Input>;
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Files_By_PkArgs = {
  _set?: Maybe<Files_Set_Input>;
  pk_columns: Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_MembersArgs = {
  _inc?: Maybe<Initiative_Members_Inc_Input>;
  _set?: Maybe<Initiative_Members_Set_Input>;
  where: Initiative_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Members_By_PkArgs = {
  _inc?: Maybe<Initiative_Members_Inc_Input>;
  _set?: Maybe<Initiative_Members_Set_Input>;
  pk_columns: Initiative_Members_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_TagsArgs = {
  _inc?: Maybe<Initiative_Tags_Inc_Input>;
  _set?: Maybe<Initiative_Tags_Set_Input>;
  where: Initiative_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Tags_By_PkArgs = {
  _inc?: Maybe<Initiative_Tags_Inc_Input>;
  _set?: Maybe<Initiative_Tags_Set_Input>;
  pk_columns: Initiative_Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Thread_CommentsArgs = {
  _inc?: Maybe<Initiative_Thread_Comments_Inc_Input>;
  _set?: Maybe<Initiative_Thread_Comments_Set_Input>;
  where: Initiative_Thread_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Thread_Comments_By_PkArgs = {
  _inc?: Maybe<Initiative_Thread_Comments_Inc_Input>;
  _set?: Maybe<Initiative_Thread_Comments_Set_Input>;
  pk_columns: Initiative_Thread_Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Thread_MessagesArgs = {
  _inc?: Maybe<Initiative_Thread_Messages_Inc_Input>;
  _set?: Maybe<Initiative_Thread_Messages_Set_Input>;
  where: Initiative_Thread_Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Thread_Messages_By_PkArgs = {
  _inc?: Maybe<Initiative_Thread_Messages_Inc_Input>;
  _set?: Maybe<Initiative_Thread_Messages_Set_Input>;
  pk_columns: Initiative_Thread_Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_ThreadsArgs = {
  _inc?: Maybe<Initiative_Threads_Inc_Input>;
  _set?: Maybe<Initiative_Threads_Set_Input>;
  where: Initiative_Threads_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Threads_By_PkArgs = {
  _inc?: Maybe<Initiative_Threads_Inc_Input>;
  _set?: Maybe<Initiative_Threads_Set_Input>;
  pk_columns: Initiative_Threads_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_VisitsArgs = {
  _inc?: Maybe<Initiative_Visits_Inc_Input>;
  _set?: Maybe<Initiative_Visits_Set_Input>;
  where: Initiative_Visits_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiative_Visits_By_PkArgs = {
  _inc?: Maybe<Initiative_Visits_Inc_Input>;
  _set?: Maybe<Initiative_Visits_Set_Input>;
  pk_columns: Initiative_Visits_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InitiativesArgs = {
  _set?: Maybe<Initiatives_Set_Input>;
  where: Initiatives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Initiatives_By_PkArgs = {
  _set?: Maybe<Initiatives_Set_Input>;
  pk_columns: Initiatives_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "org_projects" */
export type Org_Projects = {
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  org?: Maybe<Orgs>;
  org_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "org_projects" */
export type Org_Projects_Aggregate_Order_By = {
  avg?: Maybe<Org_Projects_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Org_Projects_Max_Order_By>;
  min?: Maybe<Org_Projects_Min_Order_By>;
  stddev?: Maybe<Org_Projects_Stddev_Order_By>;
  stddev_pop?: Maybe<Org_Projects_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Org_Projects_Stddev_Samp_Order_By>;
  sum?: Maybe<Org_Projects_Sum_Order_By>;
  var_pop?: Maybe<Org_Projects_Var_Pop_Order_By>;
  var_samp?: Maybe<Org_Projects_Var_Samp_Order_By>;
  variance?: Maybe<Org_Projects_Variance_Order_By>;
};

/** order by avg() on columns of table "org_projects" */
export type Org_Projects_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "org_projects". All fields are combined with a logical 'AND'. */
export type Org_Projects_Bool_Exp = {
  _and?: Maybe<Array<Org_Projects_Bool_Exp>>;
  _not?: Maybe<Org_Projects_Bool_Exp>;
  _or?: Maybe<Array<Org_Projects_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  org?: Maybe<Orgs_Bool_Exp>;
  org_id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "org_projects" */
export type Org_Projects_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  org_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "org_projects" */
export type Org_Projects_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  org_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "org_projects". */
export type Org_Projects_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  org?: Maybe<Orgs_Order_By>;
  org_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "org_projects" */
export enum Org_Projects_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'org_id',
  /** column name */
  UserId = 'user_id'
}

/** order by stddev() on columns of table "org_projects" */
export type Org_Projects_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "org_projects" */
export type Org_Projects_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "org_projects" */
export type Org_Projects_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "org_projects" */
export type Org_Projects_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "org_projects" */
export type Org_Projects_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "org_projects" */
export type Org_Projects_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "org_projects" */
export type Org_Projects_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "org_tags" */
export type Org_Tags = {
  id: Scalars['Int'];
  /** An object relationship */
  org?: Maybe<Orgs>;
  org_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  tagByTag?: Maybe<Tags>;
};

/** order by aggregate values of table "org_tags" */
export type Org_Tags_Aggregate_Order_By = {
  avg?: Maybe<Org_Tags_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Org_Tags_Max_Order_By>;
  min?: Maybe<Org_Tags_Min_Order_By>;
  stddev?: Maybe<Org_Tags_Stddev_Order_By>;
  stddev_pop?: Maybe<Org_Tags_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Org_Tags_Stddev_Samp_Order_By>;
  sum?: Maybe<Org_Tags_Sum_Order_By>;
  var_pop?: Maybe<Org_Tags_Var_Pop_Order_By>;
  var_samp?: Maybe<Org_Tags_Var_Samp_Order_By>;
  variance?: Maybe<Org_Tags_Variance_Order_By>;
};

/** order by avg() on columns of table "org_tags" */
export type Org_Tags_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "org_tags". All fields are combined with a logical 'AND'. */
export type Org_Tags_Bool_Exp = {
  _and?: Maybe<Array<Org_Tags_Bool_Exp>>;
  _not?: Maybe<Org_Tags_Bool_Exp>;
  _or?: Maybe<Array<Org_Tags_Bool_Exp>>;
  id?: Maybe<Int_Comparison_Exp>;
  org?: Maybe<Orgs_Bool_Exp>;
  org_id?: Maybe<Uuid_Comparison_Exp>;
  tagByTag?: Maybe<Tags_Bool_Exp>;
};

/** order by max() on columns of table "org_tags" */
export type Org_Tags_Max_Order_By = {
  id?: Maybe<Order_By>;
  org_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "org_tags" */
export type Org_Tags_Min_Order_By = {
  id?: Maybe<Order_By>;
  org_id?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "org_tags". */
export type Org_Tags_Order_By = {
  id?: Maybe<Order_By>;
  org?: Maybe<Orgs_Order_By>;
  org_id?: Maybe<Order_By>;
  tagByTag?: Maybe<Tags_Order_By>;
};

/** select columns of table "org_tags" */
export enum Org_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'org_id'
}

/** order by stddev() on columns of table "org_tags" */
export type Org_Tags_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "org_tags" */
export type Org_Tags_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "org_tags" */
export type Org_Tags_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "org_tags" */
export type Org_Tags_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "org_tags" */
export type Org_Tags_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "org_tags" */
export type Org_Tags_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "org_tags" */
export type Org_Tags_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "orgs" */
export type Orgs = {
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['geometry']>;
  id: Scalars['uuid'];
  /** fetch data from the table: "org_projects" */
  org_projects: Array<Org_Projects>;
  /** An array relationship */
  org_tags: Array<Org_Tags>;
};


/** columns and relationships of "orgs" */
export type OrgsOrg_ProjectsArgs = {
  distinct_on?: Maybe<Array<Org_Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Projects_Order_By>>;
  where?: Maybe<Org_Projects_Bool_Exp>;
};


/** columns and relationships of "orgs" */
export type OrgsOrg_TagsArgs = {
  distinct_on?: Maybe<Array<Org_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Tags_Order_By>>;
  where?: Maybe<Org_Tags_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "orgs". All fields are combined with a logical 'AND'. */
export type Orgs_Bool_Exp = {
  _and?: Maybe<Array<Orgs_Bool_Exp>>;
  _not?: Maybe<Orgs_Bool_Exp>;
  _or?: Maybe<Array<Orgs_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  geom?: Maybe<Geometry_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  org_projects?: Maybe<Org_Projects_Bool_Exp>;
  org_tags?: Maybe<Org_Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "orgs". */
export type Orgs_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  geom?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  org_projects_aggregate?: Maybe<Org_Projects_Aggregate_Order_By>;
  org_tags_aggregate?: Maybe<Org_Tags_Aggregate_Order_By>;
};

/** select columns of table "orgs" */
export enum Orgs_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Geom = 'geom',
  /** column name */
  Id = 'id'
}

export type Query_Root = {
  /** An array relationship */
  files: Array<Files>;
  /** fetch data from the table: "files" using primary key columns */
  files_by_pk?: Maybe<Files>;
  /** fetch data from the table: "i18n" */
  i18n: Array<I18n>;
  /** fetch data from the table: "i18n" using primary key columns */
  i18n_by_pk?: Maybe<I18n>;
  /** fetch data from the table: "i18n_categories" */
  i18n_categories: Array<I18n_Categories>;
  /** fetch data from the table: "i18n_categories" using primary key columns */
  i18n_categories_by_pk?: Maybe<I18n_Categories>;
  /** fetch data from the table: "initiative_distance" */
  initiative_distance: Array<Initiative_Distance>;
  /** An array relationship */
  initiative_members: Array<Initiative_Members>;
  /** An aggregate relationship */
  initiative_members_aggregate: Initiative_Members_Aggregate;
  /** fetch data from the table: "initiative_members" using primary key columns */
  initiative_members_by_pk?: Maybe<Initiative_Members>;
  /** An array relationship */
  initiative_tags: Array<Initiative_Tags>;
  /** fetch data from the table: "initiative_tags" using primary key columns */
  initiative_tags_by_pk?: Maybe<Initiative_Tags>;
  /** An array relationship */
  initiative_thread_comments: Array<Initiative_Thread_Comments>;
  /** fetch data from the table: "initiative_thread_comments" using primary key columns */
  initiative_thread_comments_by_pk?: Maybe<Initiative_Thread_Comments>;
  /** An array relationship */
  initiative_thread_messages: Array<Initiative_Thread_Messages>;
  /** fetch data from the table: "initiative_thread_messages" using primary key columns */
  initiative_thread_messages_by_pk?: Maybe<Initiative_Thread_Messages>;
  /** An array relationship */
  initiative_threads: Array<Initiative_Threads>;
  /** fetch data from the table: "initiative_threads" using primary key columns */
  initiative_threads_by_pk?: Maybe<Initiative_Threads>;
  /** An array relationship */
  initiative_visits: Array<Initiative_Visits>;
  /** fetch data from the table: "initiative_visits" using primary key columns */
  initiative_visits_by_pk?: Maybe<Initiative_Visits>;
  /** fetch data from the table: "initiatives" */
  initiatives: Array<Initiatives>;
  /** fetch data from the table: "initiatives" using primary key columns */
  initiatives_by_pk?: Maybe<Initiatives>;
  /** execute function "initiatives_nearby" which returns "initiatives" */
  initiatives_nearby: Array<Initiatives>;
  /** fetch data from the table: "org_projects" */
  org_projects: Array<Org_Projects>;
  /** fetch data from the table: "org_projects" using primary key columns */
  org_projects_by_pk?: Maybe<Org_Projects>;
  /** An array relationship */
  org_tags: Array<Org_Tags>;
  /** fetch data from the table: "org_tags" using primary key columns */
  org_tags_by_pk?: Maybe<Org_Tags>;
  /** fetch data from the table: "orgs" */
  orgs: Array<Orgs>;
  /** fetch data from the table: "orgs" using primary key columns */
  orgs_by_pk?: Maybe<Orgs>;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootFilesArgs = {
  distinct_on?: Maybe<Array<Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Files_Order_By>>;
  where?: Maybe<Files_Bool_Exp>;
};


export type Query_RootFiles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootI18nArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


export type Query_RootI18n_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootI18n_CategoriesArgs = {
  distinct_on?: Maybe<Array<I18n_Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Categories_Order_By>>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};


export type Query_RootI18n_Categories_By_PkArgs = {
  category: Scalars['String'];
};


export type Query_RootInitiative_DistanceArgs = {
  distinct_on?: Maybe<Array<Initiative_Distance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Distance_Order_By>>;
  where?: Maybe<Initiative_Distance_Bool_Exp>;
};


export type Query_RootInitiative_MembersArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


export type Query_RootInitiative_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


export type Query_RootInitiative_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInitiative_TagsArgs = {
  distinct_on?: Maybe<Array<Initiative_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Tags_Order_By>>;
  where?: Maybe<Initiative_Tags_Bool_Exp>;
};


export type Query_RootInitiative_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInitiative_Thread_CommentsArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Comments_Order_By>>;
  where?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
};


export type Query_RootInitiative_Thread_Comments_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInitiative_Thread_MessagesArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Messages_Order_By>>;
  where?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
};


export type Query_RootInitiative_Thread_Messages_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInitiative_ThreadsArgs = {
  distinct_on?: Maybe<Array<Initiative_Threads_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Threads_Order_By>>;
  where?: Maybe<Initiative_Threads_Bool_Exp>;
};


export type Query_RootInitiative_Threads_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInitiative_VisitsArgs = {
  distinct_on?: Maybe<Array<Initiative_Visits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Visits_Order_By>>;
  where?: Maybe<Initiative_Visits_Bool_Exp>;
};


export type Query_RootInitiative_Visits_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootInitiativesArgs = {
  distinct_on?: Maybe<Array<Initiatives_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiatives_Order_By>>;
  where?: Maybe<Initiatives_Bool_Exp>;
};


export type Query_RootInitiatives_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootInitiatives_NearbyArgs = {
  args: Initiatives_Nearby_Args;
  distinct_on?: Maybe<Array<Initiatives_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiatives_Order_By>>;
  where?: Maybe<Initiatives_Bool_Exp>;
};


export type Query_RootOrg_ProjectsArgs = {
  distinct_on?: Maybe<Array<Org_Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Projects_Order_By>>;
  where?: Maybe<Org_Projects_Bool_Exp>;
};


export type Query_RootOrg_Projects_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootOrg_TagsArgs = {
  distinct_on?: Maybe<Array<Org_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Tags_Order_By>>;
  where?: Maybe<Org_Tags_Bool_Exp>;
};


export type Query_RootOrg_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootOrgsArgs = {
  distinct_on?: Maybe<Array<Orgs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orgs_Order_By>>;
  where?: Maybe<Orgs_Bool_Exp>;
};


export type Query_RootOrgs_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Query_RootTags_By_PkArgs = {
  tag: Scalars['String'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float'];
  from: Scalars['geography'];
  use_spheroid?: Maybe<Scalars['Boolean']>;
};

export type St_D_Within_Input = {
  distance: Scalars['Float'];
  from: Scalars['geometry'];
};

export type Subscription_Root = {
  /** An array relationship */
  files: Array<Files>;
  /** fetch data from the table: "files" using primary key columns */
  files_by_pk?: Maybe<Files>;
  /** fetch data from the table: "i18n" */
  i18n: Array<I18n>;
  /** fetch data from the table: "i18n" using primary key columns */
  i18n_by_pk?: Maybe<I18n>;
  /** fetch data from the table: "i18n_categories" */
  i18n_categories: Array<I18n_Categories>;
  /** fetch data from the table: "i18n_categories" using primary key columns */
  i18n_categories_by_pk?: Maybe<I18n_Categories>;
  /** fetch data from the table: "initiative_distance" */
  initiative_distance: Array<Initiative_Distance>;
  /** An array relationship */
  initiative_members: Array<Initiative_Members>;
  /** An aggregate relationship */
  initiative_members_aggregate: Initiative_Members_Aggregate;
  /** fetch data from the table: "initiative_members" using primary key columns */
  initiative_members_by_pk?: Maybe<Initiative_Members>;
  /** An array relationship */
  initiative_tags: Array<Initiative_Tags>;
  /** fetch data from the table: "initiative_tags" using primary key columns */
  initiative_tags_by_pk?: Maybe<Initiative_Tags>;
  /** An array relationship */
  initiative_thread_comments: Array<Initiative_Thread_Comments>;
  /** fetch data from the table: "initiative_thread_comments" using primary key columns */
  initiative_thread_comments_by_pk?: Maybe<Initiative_Thread_Comments>;
  /** An array relationship */
  initiative_thread_messages: Array<Initiative_Thread_Messages>;
  /** fetch data from the table: "initiative_thread_messages" using primary key columns */
  initiative_thread_messages_by_pk?: Maybe<Initiative_Thread_Messages>;
  /** An array relationship */
  initiative_threads: Array<Initiative_Threads>;
  /** fetch data from the table: "initiative_threads" using primary key columns */
  initiative_threads_by_pk?: Maybe<Initiative_Threads>;
  /** An array relationship */
  initiative_visits: Array<Initiative_Visits>;
  /** fetch data from the table: "initiative_visits" using primary key columns */
  initiative_visits_by_pk?: Maybe<Initiative_Visits>;
  /** fetch data from the table: "initiatives" */
  initiatives: Array<Initiatives>;
  /** fetch data from the table: "initiatives" using primary key columns */
  initiatives_by_pk?: Maybe<Initiatives>;
  /** execute function "initiatives_nearby" which returns "initiatives" */
  initiatives_nearby: Array<Initiatives>;
  /** fetch data from the table: "org_projects" */
  org_projects: Array<Org_Projects>;
  /** fetch data from the table: "org_projects" using primary key columns */
  org_projects_by_pk?: Maybe<Org_Projects>;
  /** An array relationship */
  org_tags: Array<Org_Tags>;
  /** fetch data from the table: "org_tags" using primary key columns */
  org_tags_by_pk?: Maybe<Org_Tags>;
  /** fetch data from the table: "orgs" */
  orgs: Array<Orgs>;
  /** fetch data from the table: "orgs" using primary key columns */
  orgs_by_pk?: Maybe<Orgs>;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootFilesArgs = {
  distinct_on?: Maybe<Array<Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Files_Order_By>>;
  where?: Maybe<Files_Bool_Exp>;
};


export type Subscription_RootFiles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootI18nArgs = {
  distinct_on?: Maybe<Array<I18n_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Order_By>>;
  where?: Maybe<I18n_Bool_Exp>;
};


export type Subscription_RootI18n_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootI18n_CategoriesArgs = {
  distinct_on?: Maybe<Array<I18n_Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<I18n_Categories_Order_By>>;
  where?: Maybe<I18n_Categories_Bool_Exp>;
};


export type Subscription_RootI18n_Categories_By_PkArgs = {
  category: Scalars['String'];
};


export type Subscription_RootInitiative_DistanceArgs = {
  distinct_on?: Maybe<Array<Initiative_Distance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Distance_Order_By>>;
  where?: Maybe<Initiative_Distance_Bool_Exp>;
};


export type Subscription_RootInitiative_MembersArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


export type Subscription_RootInitiative_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


export type Subscription_RootInitiative_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInitiative_TagsArgs = {
  distinct_on?: Maybe<Array<Initiative_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Tags_Order_By>>;
  where?: Maybe<Initiative_Tags_Bool_Exp>;
};


export type Subscription_RootInitiative_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInitiative_Thread_CommentsArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Comments_Order_By>>;
  where?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
};


export type Subscription_RootInitiative_Thread_Comments_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInitiative_Thread_MessagesArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Messages_Order_By>>;
  where?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
};


export type Subscription_RootInitiative_Thread_Messages_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInitiative_ThreadsArgs = {
  distinct_on?: Maybe<Array<Initiative_Threads_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Threads_Order_By>>;
  where?: Maybe<Initiative_Threads_Bool_Exp>;
};


export type Subscription_RootInitiative_Threads_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInitiative_VisitsArgs = {
  distinct_on?: Maybe<Array<Initiative_Visits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Visits_Order_By>>;
  where?: Maybe<Initiative_Visits_Bool_Exp>;
};


export type Subscription_RootInitiative_Visits_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootInitiativesArgs = {
  distinct_on?: Maybe<Array<Initiatives_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiatives_Order_By>>;
  where?: Maybe<Initiatives_Bool_Exp>;
};


export type Subscription_RootInitiatives_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootInitiatives_NearbyArgs = {
  args: Initiatives_Nearby_Args;
  distinct_on?: Maybe<Array<Initiatives_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiatives_Order_By>>;
  where?: Maybe<Initiatives_Bool_Exp>;
};


export type Subscription_RootOrg_ProjectsArgs = {
  distinct_on?: Maybe<Array<Org_Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Projects_Order_By>>;
  where?: Maybe<Org_Projects_Bool_Exp>;
};


export type Subscription_RootOrg_Projects_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootOrg_TagsArgs = {
  distinct_on?: Maybe<Array<Org_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Tags_Order_By>>;
  where?: Maybe<Org_Tags_Bool_Exp>;
};


export type Subscription_RootOrg_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootOrgsArgs = {
  distinct_on?: Maybe<Array<Orgs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orgs_Order_By>>;
  where?: Maybe<Orgs_Bool_Exp>;
};


export type Subscription_RootOrgs_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tags_Order_By>>;
  where?: Maybe<Tags_Bool_Exp>;
};


export type Subscription_RootTags_By_PkArgs = {
  tag: Scalars['String'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "tags" */
export type Tags = {
  /** An array relationship */
  initiative_tags: Array<Initiative_Tags>;
  /** An array relationship */
  org_tags: Array<Org_Tags>;
  tag: Scalars['String'];
};


/** columns and relationships of "tags" */
export type TagsInitiative_TagsArgs = {
  distinct_on?: Maybe<Array<Initiative_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Tags_Order_By>>;
  where?: Maybe<Initiative_Tags_Bool_Exp>;
};


/** columns and relationships of "tags" */
export type TagsOrg_TagsArgs = {
  distinct_on?: Maybe<Array<Org_Tags_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Tags_Order_By>>;
  where?: Maybe<Org_Tags_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
  _and?: Maybe<Array<Tags_Bool_Exp>>;
  _not?: Maybe<Tags_Bool_Exp>;
  _or?: Maybe<Array<Tags_Bool_Exp>>;
  initiative_tags?: Maybe<Initiative_Tags_Bool_Exp>;
  org_tags?: Maybe<Org_Tags_Bool_Exp>;
  tag?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "tags" */
export type Tags_Insert_Input = {
  initiative_tags?: Maybe<Initiative_Tags_Arr_Rel_Insert_Input>;
  tag?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "tags" */
export type Tags_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tags>;
};

/** input type for inserting object relation for remote table "tags" */
export type Tags_Obj_Rel_Insert_Input = {
  data: Tags_Insert_Input;
};

/** Ordering options when selecting data from "tags". */
export type Tags_Order_By = {
  initiative_tags_aggregate?: Maybe<Initiative_Tags_Aggregate_Order_By>;
  org_tags_aggregate?: Maybe<Org_Tags_Aggregate_Order_By>;
  tag?: Maybe<Order_By>;
};

/** select columns of table "tags" */
export enum Tags_Select_Column {
  /** column name */
  Tag = 'tag'
}


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** Boolean expression to compare columns of type "timetz". All fields are combined with logical 'AND'. */
export type Timetz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timetz']>;
  _gt?: Maybe<Scalars['timetz']>;
  _gte?: Maybe<Scalars['timetz']>;
  _in?: Maybe<Array<Scalars['timetz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timetz']>;
  _lte?: Maybe<Scalars['timetz']>;
  _neq?: Maybe<Scalars['timetz']>;
  _nin?: Maybe<Array<Scalars['timetz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  avatar_url?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  display_name?: Maybe<Scalars['String']>;
  /** An array relationship */
  files: Array<Files>;
  id: Scalars['uuid'];
  /** An array relationship */
  initiative_members: Array<Initiative_Members>;
  /** An aggregate relationship */
  initiative_members_aggregate: Initiative_Members_Aggregate;
  /** An array relationship */
  initiative_thread_comments: Array<Initiative_Thread_Comments>;
  /** An array relationship */
  initiative_thread_messages: Array<Initiative_Thread_Messages>;
  /** An array relationship */
  initiative_visits: Array<Initiative_Visits>;
  /** fetch data from the table: "org_projects" */
  org_projects: Array<Org_Projects>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "users" */
export type UsersFilesArgs = {
  distinct_on?: Maybe<Array<Files_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Files_Order_By>>;
  where?: Maybe<Files_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInitiative_MembersArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInitiative_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Initiative_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Members_Order_By>>;
  where?: Maybe<Initiative_Members_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInitiative_Thread_CommentsArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Comments_Order_By>>;
  where?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInitiative_Thread_MessagesArgs = {
  distinct_on?: Maybe<Array<Initiative_Thread_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Thread_Messages_Order_By>>;
  where?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInitiative_VisitsArgs = {
  distinct_on?: Maybe<Array<Initiative_Visits_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Initiative_Visits_Order_By>>;
  where?: Maybe<Initiative_Visits_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOrg_ProjectsArgs = {
  distinct_on?: Maybe<Array<Org_Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Org_Projects_Order_By>>;
  where?: Maybe<Org_Projects_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  avatar_url?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  display_name?: Maybe<String_Comparison_Exp>;
  files?: Maybe<Files_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  initiative_members?: Maybe<Initiative_Members_Bool_Exp>;
  initiative_thread_comments?: Maybe<Initiative_Thread_Comments_Bool_Exp>;
  initiative_thread_messages?: Maybe<Initiative_Thread_Messages_Bool_Exp>;
  initiative_visits?: Maybe<Initiative_Visits_Bool_Exp>;
  org_projects?: Maybe<Org_Projects_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  avatar_url?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  display_name?: Maybe<Order_By>;
  files_aggregate?: Maybe<Files_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  initiative_members_aggregate?: Maybe<Initiative_Members_Aggregate_Order_By>;
  initiative_thread_comments_aggregate?: Maybe<Initiative_Thread_Comments_Aggregate_Order_By>;
  initiative_thread_messages_aggregate?: Maybe<Initiative_Thread_Messages_Aggregate_Order_By>;
  initiative_visits_aggregate?: Maybe<Initiative_Visits_Aggregate_Order_By>;
  org_projects_aggregate?: Maybe<Org_Projects_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type AddInitiativeMutationVariables = Exact<{
  geom: Scalars['geometry'];
  name: Scalars['String'];
  description: Scalars['String'];
  user_id: Scalars['uuid'];
  problem?: Maybe<Scalars['String']>;
  goal?: Maybe<Scalars['String']>;
  context?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
}>;


export type AddInitiativeMutation = { insert_initiatives_one?: Maybe<Pick<Initiatives, 'created_at' | 'description' | 'geom' | 'id' | 'image' | 'name'>> };

export type DeleteInitiativeMutationVariables = Exact<{
  initiative_id: Scalars['uuid'];
}>;


export type DeleteInitiativeMutation = { delete_initiatives_by_pk?: Maybe<Pick<Initiatives, 'id'>> };

export type AddInitiativeMessageMutationVariables = Exact<{
  thread_id: Scalars['Int'];
  user_id: Scalars['uuid'];
  message?: Maybe<Scalars['String']>;
}>;


export type AddInitiativeMessageMutation = { insert_initiative_thread_messages_one?: Maybe<Pick<Initiative_Thread_Messages, 'id'>> };

export type DeleteInitiativeMemberMutationVariables = Exact<{
  initiative_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
}>;


export type DeleteInitiativeMemberMutation = { delete_initiative_members?: Maybe<(
    Pick<Initiative_Members_Mutation_Response, 'affected_rows'>
    & { returning: Array<Pick<Initiative_Members, 'initiative_id' | 'user_id'>> }
  )> };

export type AddInitiativeMemberMutationVariables = Exact<{
  initiative_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
  contractor?: Maybe<Scalars['Boolean']>;
  donator?: Maybe<Scalars['Boolean']>;
  volunteer?: Maybe<Scalars['Boolean']>;
}>;


export type AddInitiativeMemberMutation = { insert_initiative_members_one?: Maybe<Pick<Initiative_Members, 'user_id' | 'initiative_id'>> };

export type AddInitiativeVisitMutationVariables = Exact<{
  initiative_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
}>;


export type AddInitiativeVisitMutation = { insert_initiative_visits_one?: Maybe<{ initiative: Pick<Initiatives, 'id'> }> };

export type InsertFileMutationVariables = Exact<{
  file: Files_Insert_Input;
}>;


export type InsertFileMutation = { insert_files_one?: Maybe<Pick<Files, 'id'>> };

export type DeleteFilesMutationVariables = Exact<{
  where: Files_Bool_Exp;
}>;


export type DeleteFilesMutation = { delete_files?: Maybe<Pick<Files_Mutation_Response, 'affected_rows'>> };

export type InitiativeFieldsFragment = (
  Pick<Initiatives, 'geom' | 'name' | 'id' | 'image' | 'description' | 'created_at'>
  & { initiative_members: Array<Pick<Initiative_Members, 'user_id'>> }
);

export type InitiativesNearbyQueryVariables = Exact<{
  location: Scalars['geometry'];
  limit?: Maybe<Scalars['Int']>;
  max_date?: Maybe<Scalars['timestamptz']>;
  max_distance?: Maybe<Scalars['float8']>;
  min_date?: Maybe<Scalars['timestamptz']>;
  min_distance?: Maybe<Scalars['float8']>;
  user_id?: Maybe<Scalars['uuid']>;
  own?: Maybe<Scalars['Boolean']>;
}>;


export type InitiativesNearbyQuery = { initiatives_nearby: Array<InitiativeFieldsFragment> };

export type MyInitiativesNearbyQueryVariables = Exact<{
  location: Scalars['geometry'];
  limit?: Maybe<Scalars['Int']>;
  max_date?: Maybe<Scalars['timestamptz']>;
  max_distance?: Maybe<Scalars['float8']>;
  min_date?: Maybe<Scalars['timestamptz']>;
  min_distance?: Maybe<Scalars['float8']>;
  user_id: Scalars['uuid'];
  own?: Maybe<Scalars['Boolean']>;
}>;


export type MyInitiativesNearbyQuery = { initiatives_nearby: Array<InitiativeFieldsFragment> };

export type InitiativesLastVisitedQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  max_date?: Maybe<Scalars['timestamptz']>;
  min_date?: Maybe<Scalars['timestamptz']>;
  user_id: Scalars['uuid'];
}>;


export type InitiativesLastVisitedQuery = { initiative_visits: Array<(
    Pick<Initiative_Visits, 'visited_at'>
    & { initiative: InitiativeFieldsFragment }
  )> };

export type InitiativeQueryVariables = Exact<{
  initiative_id: Scalars['uuid'];
}>;


export type InitiativeQuery = { initiatives_by_pk?: Maybe<InitiativeFieldsFragment> };

export type MyInitiativesQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type MyInitiativesQuery = { initiatives: Array<InitiativeFieldsFragment> };

export type InitiativeThreadsQueryVariables = Exact<{
  initiative_id: Scalars['uuid'];
}>;


export type InitiativeThreadsQuery = { initiative_threads: Array<Pick<Initiative_Threads, 'context' | 'goal' | 'problem'>> };

export type InitiativePostsQueryVariables = Exact<{
  initiative_id: Scalars['uuid'];
}>;


export type InitiativePostsQuery = { initiative_thread_messages: Array<(
    Pick<Initiative_Thread_Messages, 'id' | 'thread_id' | 'created_at' | 'message'>
    & { initiative_thread_comments: Array<Pick<Initiative_Thread_Comments, 'created_at'>>, user?: Maybe<Pick<Users, 'avatar_url' | 'display_name'>> }
  )> };

export type InitiativePostCommentsQueryVariables = Exact<{
  message_id: Scalars['Int'];
}>;


export type InitiativePostCommentsQuery = { initiative_thread_comments: Array<(
    Pick<Initiative_Thread_Comments, 'created_at' | 'comment'>
    & { user?: Maybe<Pick<Users, 'avatar_url' | 'display_name'>> }
  )> };

export type UserQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type UserQuery = { users_by_pk?: Maybe<Pick<Users, 'id' | 'avatar_url' | 'created_at' | 'display_name'>> };

export type FilesQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type FilesQuery = { files: Array<Pick<Files, 'id' | 'created_at' | 'file_path' | 'downloadable_url'>> };

export type S_GetFilesSubscriptionVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type S_GetFilesSubscription = { files: Array<Pick<Files, 'id' | 'created_at' | 'file_path' | 'downloadable_url'>> };

export const InitiativeFieldsFragmentDoc = gql`
    fragment InitiativeFields on initiatives {
  geom
  name
  id
  image
  description
  created_at
  initiative_members {
    user_id
  }
}
    `;
export const AddInitiativeDocument = gql`
    mutation AddInitiative($geom: geometry!, $name: String!, $description: String!, $user_id: uuid!, $problem: String = "", $goal: String = "", $context: String = "", $image: String = "") {
  insert_initiatives_one(
    object: {description: $description, geom: $geom, image: $image, initiative_members: {data: {initiator: true, user_id: $user_id}}, initiative_threads: {data: {context: $context, goal: $goal, problem: $problem}}, initiative_visits: {data: {user_id: $user_id}}, name: $name}
  ) {
    created_at
    description
    geom
    id
    image
    name
  }
}
    `;
export type AddInitiativeMutationFn = Apollo.MutationFunction<AddInitiativeMutation, AddInitiativeMutationVariables>;

/**
 * __useAddInitiativeMutation__
 *
 * To run a mutation, you first call `useAddInitiativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInitiativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInitiativeMutation, { data, loading, error }] = useAddInitiativeMutation({
 *   variables: {
 *      geom: // value for 'geom'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      user_id: // value for 'user_id'
 *      problem: // value for 'problem'
 *      goal: // value for 'goal'
 *      context: // value for 'context'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useAddInitiativeMutation(baseOptions?: Apollo.MutationHookOptions<AddInitiativeMutation, AddInitiativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInitiativeMutation, AddInitiativeMutationVariables>(AddInitiativeDocument, options);
      }
export type AddInitiativeMutationHookResult = ReturnType<typeof useAddInitiativeMutation>;
export type AddInitiativeMutationResult = Apollo.MutationResult<AddInitiativeMutation>;
export type AddInitiativeMutationOptions = Apollo.BaseMutationOptions<AddInitiativeMutation, AddInitiativeMutationVariables>;
export const DeleteInitiativeDocument = gql`
    mutation DeleteInitiative($initiative_id: uuid!) {
  delete_initiatives_by_pk(id: $initiative_id) {
    id
  }
}
    `;
export type DeleteInitiativeMutationFn = Apollo.MutationFunction<DeleteInitiativeMutation, DeleteInitiativeMutationVariables>;

/**
 * __useDeleteInitiativeMutation__
 *
 * To run a mutation, you first call `useDeleteInitiativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInitiativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInitiativeMutation, { data, loading, error }] = useDeleteInitiativeMutation({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *   },
 * });
 */
export function useDeleteInitiativeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInitiativeMutation, DeleteInitiativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInitiativeMutation, DeleteInitiativeMutationVariables>(DeleteInitiativeDocument, options);
      }
export type DeleteInitiativeMutationHookResult = ReturnType<typeof useDeleteInitiativeMutation>;
export type DeleteInitiativeMutationResult = Apollo.MutationResult<DeleteInitiativeMutation>;
export type DeleteInitiativeMutationOptions = Apollo.BaseMutationOptions<DeleteInitiativeMutation, DeleteInitiativeMutationVariables>;
export const AddInitiativeMessageDocument = gql`
    mutation AddInitiativeMessage($thread_id: Int!, $user_id: uuid!, $message: String) {
  insert_initiative_thread_messages_one(
    object: {thread_id: $thread_id, user_id: $user_id, message: $message}
  ) {
    id
  }
}
    `;
export type AddInitiativeMessageMutationFn = Apollo.MutationFunction<AddInitiativeMessageMutation, AddInitiativeMessageMutationVariables>;

/**
 * __useAddInitiativeMessageMutation__
 *
 * To run a mutation, you first call `useAddInitiativeMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInitiativeMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInitiativeMessageMutation, { data, loading, error }] = useAddInitiativeMessageMutation({
 *   variables: {
 *      thread_id: // value for 'thread_id'
 *      user_id: // value for 'user_id'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAddInitiativeMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddInitiativeMessageMutation, AddInitiativeMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInitiativeMessageMutation, AddInitiativeMessageMutationVariables>(AddInitiativeMessageDocument, options);
      }
export type AddInitiativeMessageMutationHookResult = ReturnType<typeof useAddInitiativeMessageMutation>;
export type AddInitiativeMessageMutationResult = Apollo.MutationResult<AddInitiativeMessageMutation>;
export type AddInitiativeMessageMutationOptions = Apollo.BaseMutationOptions<AddInitiativeMessageMutation, AddInitiativeMessageMutationVariables>;
export const DeleteInitiativeMemberDocument = gql`
    mutation DeleteInitiativeMember($initiative_id: uuid!, $user_id: uuid!) {
  delete_initiative_members(
    where: {initiative_id: {_eq: $initiative_id}, user_id: {_eq: $user_id}}
  ) {
    affected_rows
    returning {
      initiative_id
      user_id
    }
  }
}
    `;
export type DeleteInitiativeMemberMutationFn = Apollo.MutationFunction<DeleteInitiativeMemberMutation, DeleteInitiativeMemberMutationVariables>;

/**
 * __useDeleteInitiativeMemberMutation__
 *
 * To run a mutation, you first call `useDeleteInitiativeMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInitiativeMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInitiativeMemberMutation, { data, loading, error }] = useDeleteInitiativeMemberMutation({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useDeleteInitiativeMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInitiativeMemberMutation, DeleteInitiativeMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInitiativeMemberMutation, DeleteInitiativeMemberMutationVariables>(DeleteInitiativeMemberDocument, options);
      }
export type DeleteInitiativeMemberMutationHookResult = ReturnType<typeof useDeleteInitiativeMemberMutation>;
export type DeleteInitiativeMemberMutationResult = Apollo.MutationResult<DeleteInitiativeMemberMutation>;
export type DeleteInitiativeMemberMutationOptions = Apollo.BaseMutationOptions<DeleteInitiativeMemberMutation, DeleteInitiativeMemberMutationVariables>;
export const AddInitiativeMemberDocument = gql`
    mutation AddInitiativeMember($initiative_id: uuid!, $user_id: uuid!, $contractor: Boolean, $donator: Boolean, $volunteer: Boolean) {
  insert_initiative_members_one(
    object: {initiative_id: $initiative_id, user_id: $user_id, contractor: $contractor, donator: $donator, volunteer: $volunteer}
  ) {
    user_id
    initiative_id
  }
}
    `;
export type AddInitiativeMemberMutationFn = Apollo.MutationFunction<AddInitiativeMemberMutation, AddInitiativeMemberMutationVariables>;

/**
 * __useAddInitiativeMemberMutation__
 *
 * To run a mutation, you first call `useAddInitiativeMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInitiativeMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInitiativeMemberMutation, { data, loading, error }] = useAddInitiativeMemberMutation({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *      user_id: // value for 'user_id'
 *      contractor: // value for 'contractor'
 *      donator: // value for 'donator'
 *      volunteer: // value for 'volunteer'
 *   },
 * });
 */
export function useAddInitiativeMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddInitiativeMemberMutation, AddInitiativeMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInitiativeMemberMutation, AddInitiativeMemberMutationVariables>(AddInitiativeMemberDocument, options);
      }
export type AddInitiativeMemberMutationHookResult = ReturnType<typeof useAddInitiativeMemberMutation>;
export type AddInitiativeMemberMutationResult = Apollo.MutationResult<AddInitiativeMemberMutation>;
export type AddInitiativeMemberMutationOptions = Apollo.BaseMutationOptions<AddInitiativeMemberMutation, AddInitiativeMemberMutationVariables>;
export const AddInitiativeVisitDocument = gql`
    mutation AddInitiativeVisit($initiative_id: uuid!, $user_id: uuid!) {
  insert_initiative_visits_one(
    object: {initiative_id: $initiative_id, user_id: $user_id}
  ) {
    initiative {
      id
    }
  }
}
    `;
export type AddInitiativeVisitMutationFn = Apollo.MutationFunction<AddInitiativeVisitMutation, AddInitiativeVisitMutationVariables>;

/**
 * __useAddInitiativeVisitMutation__
 *
 * To run a mutation, you first call `useAddInitiativeVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInitiativeVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInitiativeVisitMutation, { data, loading, error }] = useAddInitiativeVisitMutation({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useAddInitiativeVisitMutation(baseOptions?: Apollo.MutationHookOptions<AddInitiativeVisitMutation, AddInitiativeVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInitiativeVisitMutation, AddInitiativeVisitMutationVariables>(AddInitiativeVisitDocument, options);
      }
export type AddInitiativeVisitMutationHookResult = ReturnType<typeof useAddInitiativeVisitMutation>;
export type AddInitiativeVisitMutationResult = Apollo.MutationResult<AddInitiativeVisitMutation>;
export type AddInitiativeVisitMutationOptions = Apollo.BaseMutationOptions<AddInitiativeVisitMutation, AddInitiativeVisitMutationVariables>;
export const InsertFileDocument = gql`
    mutation insertFile($file: files_insert_input!) {
  insert_files_one(object: $file) {
    id
  }
}
    `;
export type InsertFileMutationFn = Apollo.MutationFunction<InsertFileMutation, InsertFileMutationVariables>;

/**
 * __useInsertFileMutation__
 *
 * To run a mutation, you first call `useInsertFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFileMutation, { data, loading, error }] = useInsertFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useInsertFileMutation(baseOptions?: Apollo.MutationHookOptions<InsertFileMutation, InsertFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertFileMutation, InsertFileMutationVariables>(InsertFileDocument, options);
      }
export type InsertFileMutationHookResult = ReturnType<typeof useInsertFileMutation>;
export type InsertFileMutationResult = Apollo.MutationResult<InsertFileMutation>;
export type InsertFileMutationOptions = Apollo.BaseMutationOptions<InsertFileMutation, InsertFileMutationVariables>;
export const DeleteFilesDocument = gql`
    mutation deleteFiles($where: files_bool_exp!) {
  delete_files(where: $where) {
    affected_rows
  }
}
    `;
export type DeleteFilesMutationFn = Apollo.MutationFunction<DeleteFilesMutation, DeleteFilesMutationVariables>;

/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilesMutation, { data, loading, error }] = useDeleteFilesMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteFilesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFilesMutation, DeleteFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFilesMutation, DeleteFilesMutationVariables>(DeleteFilesDocument, options);
      }
export type DeleteFilesMutationHookResult = ReturnType<typeof useDeleteFilesMutation>;
export type DeleteFilesMutationResult = Apollo.MutationResult<DeleteFilesMutation>;
export type DeleteFilesMutationOptions = Apollo.BaseMutationOptions<DeleteFilesMutation, DeleteFilesMutationVariables>;
export const InitiativesNearbyDocument = gql`
    query InitiativesNearby($location: geometry!, $limit: Int = 20, $max_date: timestamptz = "2999-01-01T00:00:00.000Z", $max_distance: float8 = 20037500.0, $min_date: timestamptz = "1970-01-01T00:00:00.000Z", $min_distance: float8 = 0.0, $user_id: uuid, $own: Boolean = false) {
  initiatives_nearby(
    args: {location: $location, own: $own, user_id: $user_id, max_date: $max_date, limit: $limit, max_distance: $max_distance, min_date: $min_date, min_distance: $min_distance}
  ) {
    ...InitiativeFields
  }
}
    ${InitiativeFieldsFragmentDoc}`;

/**
 * __useInitiativesNearbyQuery__
 *
 * To run a query within a React component, call `useInitiativesNearbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativesNearbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativesNearbyQuery({
 *   variables: {
 *      location: // value for 'location'
 *      limit: // value for 'limit'
 *      max_date: // value for 'max_date'
 *      max_distance: // value for 'max_distance'
 *      min_date: // value for 'min_date'
 *      min_distance: // value for 'min_distance'
 *      user_id: // value for 'user_id'
 *      own: // value for 'own'
 *   },
 * });
 */
export function useInitiativesNearbyQuery(baseOptions: Apollo.QueryHookOptions<InitiativesNearbyQuery, InitiativesNearbyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitiativesNearbyQuery, InitiativesNearbyQueryVariables>(InitiativesNearbyDocument, options);
      }
export function useInitiativesNearbyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitiativesNearbyQuery, InitiativesNearbyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitiativesNearbyQuery, InitiativesNearbyQueryVariables>(InitiativesNearbyDocument, options);
        }
export type InitiativesNearbyQueryHookResult = ReturnType<typeof useInitiativesNearbyQuery>;
export type InitiativesNearbyLazyQueryHookResult = ReturnType<typeof useInitiativesNearbyLazyQuery>;
export type InitiativesNearbyQueryResult = Apollo.QueryResult<InitiativesNearbyQuery, InitiativesNearbyQueryVariables>;
export const MyInitiativesNearbyDocument = gql`
    query MyInitiativesNearby($location: geometry!, $limit: Int = 20, $max_date: timestamptz = "2999-01-01T00:00:00.000Z", $max_distance: float8 = 20037500.0, $min_date: timestamptz = "1970-01-01T00:00:00.000Z", $min_distance: float8 = 0.0, $user_id: uuid!, $own: Boolean = true) {
  initiatives_nearby(
    args: {location: $location, own: $own, user_id: $user_id, max_date: $max_date, limit: $limit, max_distance: $max_distance, min_date: $min_date, min_distance: $min_distance}
  ) {
    ...InitiativeFields
  }
}
    ${InitiativeFieldsFragmentDoc}`;

/**
 * __useMyInitiativesNearbyQuery__
 *
 * To run a query within a React component, call `useMyInitiativesNearbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInitiativesNearbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInitiativesNearbyQuery({
 *   variables: {
 *      location: // value for 'location'
 *      limit: // value for 'limit'
 *      max_date: // value for 'max_date'
 *      max_distance: // value for 'max_distance'
 *      min_date: // value for 'min_date'
 *      min_distance: // value for 'min_distance'
 *      user_id: // value for 'user_id'
 *      own: // value for 'own'
 *   },
 * });
 */
export function useMyInitiativesNearbyQuery(baseOptions: Apollo.QueryHookOptions<MyInitiativesNearbyQuery, MyInitiativesNearbyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyInitiativesNearbyQuery, MyInitiativesNearbyQueryVariables>(MyInitiativesNearbyDocument, options);
      }
export function useMyInitiativesNearbyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyInitiativesNearbyQuery, MyInitiativesNearbyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyInitiativesNearbyQuery, MyInitiativesNearbyQueryVariables>(MyInitiativesNearbyDocument, options);
        }
export type MyInitiativesNearbyQueryHookResult = ReturnType<typeof useMyInitiativesNearbyQuery>;
export type MyInitiativesNearbyLazyQueryHookResult = ReturnType<typeof useMyInitiativesNearbyLazyQuery>;
export type MyInitiativesNearbyQueryResult = Apollo.QueryResult<MyInitiativesNearbyQuery, MyInitiativesNearbyQueryVariables>;
export const InitiativesLastVisitedDocument = gql`
    query InitiativesLastVisited($limit: Int = 20, $max_date: timestamptz = "2999-01-01T00:00:00.000Z", $min_date: timestamptz = "1970-01-01T00:00:00.000Z", $user_id: uuid!) {
  initiative_visits(
    where: {_and: [{user_id: {_eq: $user_id}}, {visited_at: {_gt: $min_date}}, {visited_at: {_lte: $max_date}}]}
    order_by: {visited_at: desc}
    limit: $limit
  ) {
    initiative {
      ...InitiativeFields
    }
    visited_at
  }
}
    ${InitiativeFieldsFragmentDoc}`;

/**
 * __useInitiativesLastVisitedQuery__
 *
 * To run a query within a React component, call `useInitiativesLastVisitedQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativesLastVisitedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativesLastVisitedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      max_date: // value for 'max_date'
 *      min_date: // value for 'min_date'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useInitiativesLastVisitedQuery(baseOptions: Apollo.QueryHookOptions<InitiativesLastVisitedQuery, InitiativesLastVisitedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitiativesLastVisitedQuery, InitiativesLastVisitedQueryVariables>(InitiativesLastVisitedDocument, options);
      }
export function useInitiativesLastVisitedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitiativesLastVisitedQuery, InitiativesLastVisitedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitiativesLastVisitedQuery, InitiativesLastVisitedQueryVariables>(InitiativesLastVisitedDocument, options);
        }
export type InitiativesLastVisitedQueryHookResult = ReturnType<typeof useInitiativesLastVisitedQuery>;
export type InitiativesLastVisitedLazyQueryHookResult = ReturnType<typeof useInitiativesLastVisitedLazyQuery>;
export type InitiativesLastVisitedQueryResult = Apollo.QueryResult<InitiativesLastVisitedQuery, InitiativesLastVisitedQueryVariables>;
export const InitiativeDocument = gql`
    query Initiative($initiative_id: uuid!) {
  initiatives_by_pk(id: $initiative_id) {
    ...InitiativeFields
  }
}
    ${InitiativeFieldsFragmentDoc}`;

/**
 * __useInitiativeQuery__
 *
 * To run a query within a React component, call `useInitiativeQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeQuery({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *   },
 * });
 */
export function useInitiativeQuery(baseOptions: Apollo.QueryHookOptions<InitiativeQuery, InitiativeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitiativeQuery, InitiativeQueryVariables>(InitiativeDocument, options);
      }
export function useInitiativeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitiativeQuery, InitiativeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitiativeQuery, InitiativeQueryVariables>(InitiativeDocument, options);
        }
export type InitiativeQueryHookResult = ReturnType<typeof useInitiativeQuery>;
export type InitiativeLazyQueryHookResult = ReturnType<typeof useInitiativeLazyQuery>;
export type InitiativeQueryResult = Apollo.QueryResult<InitiativeQuery, InitiativeQueryVariables>;
export const MyInitiativesDocument = gql`
    query MyInitiatives($user_id: uuid!) {
  initiatives(where: {initiative_members: {user: {id: {_eq: $user_id}}}}) {
    ...InitiativeFields
  }
}
    ${InitiativeFieldsFragmentDoc}`;

/**
 * __useMyInitiativesQuery__
 *
 * To run a query within a React component, call `useMyInitiativesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInitiativesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInitiativesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useMyInitiativesQuery(baseOptions: Apollo.QueryHookOptions<MyInitiativesQuery, MyInitiativesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyInitiativesQuery, MyInitiativesQueryVariables>(MyInitiativesDocument, options);
      }
export function useMyInitiativesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyInitiativesQuery, MyInitiativesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyInitiativesQuery, MyInitiativesQueryVariables>(MyInitiativesDocument, options);
        }
export type MyInitiativesQueryHookResult = ReturnType<typeof useMyInitiativesQuery>;
export type MyInitiativesLazyQueryHookResult = ReturnType<typeof useMyInitiativesLazyQuery>;
export type MyInitiativesQueryResult = Apollo.QueryResult<MyInitiativesQuery, MyInitiativesQueryVariables>;
export const InitiativeThreadsDocument = gql`
    query InitiativeThreads($initiative_id: uuid!) {
  initiative_threads(where: {initiative_id: {_eq: $initiative_id}}) {
    context
    goal
    problem
  }
}
    `;

/**
 * __useInitiativeThreadsQuery__
 *
 * To run a query within a React component, call `useInitiativeThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeThreadsQuery({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *   },
 * });
 */
export function useInitiativeThreadsQuery(baseOptions: Apollo.QueryHookOptions<InitiativeThreadsQuery, InitiativeThreadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitiativeThreadsQuery, InitiativeThreadsQueryVariables>(InitiativeThreadsDocument, options);
      }
export function useInitiativeThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitiativeThreadsQuery, InitiativeThreadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitiativeThreadsQuery, InitiativeThreadsQueryVariables>(InitiativeThreadsDocument, options);
        }
export type InitiativeThreadsQueryHookResult = ReturnType<typeof useInitiativeThreadsQuery>;
export type InitiativeThreadsLazyQueryHookResult = ReturnType<typeof useInitiativeThreadsLazyQuery>;
export type InitiativeThreadsQueryResult = Apollo.QueryResult<InitiativeThreadsQuery, InitiativeThreadsQueryVariables>;
export const InitiativePostsDocument = gql`
    query InitiativePosts($initiative_id: uuid!) {
  initiative_thread_messages(
    where: {initiative_thread: {initiative_id: {_eq: $initiative_id}}}
  ) {
    id
    thread_id
    created_at
    message
    initiative_thread_comments {
      created_at
    }
    user {
      avatar_url
      display_name
    }
  }
}
    `;

/**
 * __useInitiativePostsQuery__
 *
 * To run a query within a React component, call `useInitiativePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativePostsQuery({
 *   variables: {
 *      initiative_id: // value for 'initiative_id'
 *   },
 * });
 */
export function useInitiativePostsQuery(baseOptions: Apollo.QueryHookOptions<InitiativePostsQuery, InitiativePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitiativePostsQuery, InitiativePostsQueryVariables>(InitiativePostsDocument, options);
      }
export function useInitiativePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitiativePostsQuery, InitiativePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitiativePostsQuery, InitiativePostsQueryVariables>(InitiativePostsDocument, options);
        }
export type InitiativePostsQueryHookResult = ReturnType<typeof useInitiativePostsQuery>;
export type InitiativePostsLazyQueryHookResult = ReturnType<typeof useInitiativePostsLazyQuery>;
export type InitiativePostsQueryResult = Apollo.QueryResult<InitiativePostsQuery, InitiativePostsQueryVariables>;
export const InitiativePostCommentsDocument = gql`
    query InitiativePostComments($message_id: Int!) {
  initiative_thread_comments(where: {message_id: {_eq: $message_id}}) {
    created_at
    comment
    user {
      avatar_url
      display_name
    }
  }
}
    `;

/**
 * __useInitiativePostCommentsQuery__
 *
 * To run a query within a React component, call `useInitiativePostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativePostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativePostCommentsQuery({
 *   variables: {
 *      message_id: // value for 'message_id'
 *   },
 * });
 */
export function useInitiativePostCommentsQuery(baseOptions: Apollo.QueryHookOptions<InitiativePostCommentsQuery, InitiativePostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitiativePostCommentsQuery, InitiativePostCommentsQueryVariables>(InitiativePostCommentsDocument, options);
      }
export function useInitiativePostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitiativePostCommentsQuery, InitiativePostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitiativePostCommentsQuery, InitiativePostCommentsQueryVariables>(InitiativePostCommentsDocument, options);
        }
export type InitiativePostCommentsQueryHookResult = ReturnType<typeof useInitiativePostCommentsQuery>;
export type InitiativePostCommentsLazyQueryHookResult = ReturnType<typeof useInitiativePostCommentsLazyQuery>;
export type InitiativePostCommentsQueryResult = Apollo.QueryResult<InitiativePostCommentsQuery, InitiativePostCommentsQueryVariables>;
export const UserDocument = gql`
    query User($user_id: uuid!) {
  users_by_pk(id: $user_id) {
    id
    avatar_url
    created_at
    display_name
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const FilesDocument = gql`
    query Files($limit: Int!) {
  files(limit: $limit) {
    id
    created_at
    file_path
    downloadable_url
  }
}
    `;

/**
 * __useFilesQuery__
 *
 * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFilesQuery(baseOptions: Apollo.QueryHookOptions<FilesQuery, FilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
      }
export function useFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
        }
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>;
export type FilesQueryResult = Apollo.QueryResult<FilesQuery, FilesQueryVariables>;
export const S_GetFilesDocument = gql`
    subscription s_getFiles($limit: Int!) {
  files(limit: $limit, order_by: {created_at: desc}) {
    id
    created_at
    file_path
    downloadable_url
  }
}
    `;

/**
 * __useS_GetFilesSubscription__
 *
 * To run a query within a React component, call `useS_GetFilesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useS_GetFilesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useS_GetFilesSubscription({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useS_GetFilesSubscription(baseOptions: Apollo.SubscriptionHookOptions<S_GetFilesSubscription, S_GetFilesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<S_GetFilesSubscription, S_GetFilesSubscriptionVariables>(S_GetFilesDocument, options);
      }
export type S_GetFilesSubscriptionHookResult = ReturnType<typeof useS_GetFilesSubscription>;
export type S_GetFilesSubscriptionResult = Apollo.SubscriptionResult<S_GetFilesSubscription>;
export type filesKeySpecifier = ('created_at' | 'downloadable_url' | 'file_path' | 'id' | 'initiative' | 'initiative_id' | 'user' | 'user_id' | filesKeySpecifier)[];
export type filesFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	downloadable_url?: FieldPolicy<any> | FieldReadFunction<any>,
	file_path?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type files_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | files_mutation_responseKeySpecifier)[];
export type files_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type i18nKeySpecifier = ('category' | 'en' | 'fr' | 'i18n_category' | 'id' | 'key' | 'uk' | i18nKeySpecifier)[];
export type i18nFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	en?: FieldPolicy<any> | FieldReadFunction<any>,
	fr?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_category?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	uk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type i18n_categoriesKeySpecifier = ('category' | 'i18ns' | i18n_categoriesKeySpecifier)[];
export type i18n_categoriesFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	i18ns?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_distanceKeySpecifier = ('created_at' | 'description' | 'distance' | 'files' | 'geom' | 'id' | 'image' | 'initiative_members' | 'initiative_members_aggregate' | 'initiative_tags' | 'initiative_threads' | 'initiative_visits' | 'modified_at' | 'name' | initiative_distanceKeySpecifier)[];
export type initiative_distanceFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	distance?: FieldPolicy<any> | FieldReadFunction<any>,
	files?: FieldPolicy<any> | FieldReadFunction<any>,
	geom?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	modified_at?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_membersKeySpecifier = ('contractor' | 'created_at' | 'donator' | 'id' | 'initiative' | 'initiative_id' | 'initiator' | 'user' | 'user_id' | 'volunteer' | initiative_membersKeySpecifier)[];
export type initiative_membersFieldPolicy = {
	contractor?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	donator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiator?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	volunteer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_aggregateKeySpecifier = ('aggregate' | 'nodes' | initiative_members_aggregateKeySpecifier)[];
export type initiative_members_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_aggregate_fieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddev_pop' | 'stddev_samp' | 'sum' | 'var_pop' | 'var_samp' | 'variance' | initiative_members_aggregate_fieldsKeySpecifier)[];
export type initiative_members_aggregate_fieldsFieldPolicy = {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	var_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	var_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_avg_fieldsKeySpecifier = ('id' | initiative_members_avg_fieldsKeySpecifier)[];
export type initiative_members_avg_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_max_fieldsKeySpecifier = ('created_at' | 'id' | 'initiative_id' | 'user_id' | initiative_members_max_fieldsKeySpecifier)[];
export type initiative_members_max_fieldsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_min_fieldsKeySpecifier = ('created_at' | 'id' | 'initiative_id' | 'user_id' | initiative_members_min_fieldsKeySpecifier)[];
export type initiative_members_min_fieldsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiative_members_mutation_responseKeySpecifier)[];
export type initiative_members_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_stddev_fieldsKeySpecifier = ('id' | initiative_members_stddev_fieldsKeySpecifier)[];
export type initiative_members_stddev_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_stddev_pop_fieldsKeySpecifier = ('id' | initiative_members_stddev_pop_fieldsKeySpecifier)[];
export type initiative_members_stddev_pop_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_stddev_samp_fieldsKeySpecifier = ('id' | initiative_members_stddev_samp_fieldsKeySpecifier)[];
export type initiative_members_stddev_samp_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_sum_fieldsKeySpecifier = ('id' | initiative_members_sum_fieldsKeySpecifier)[];
export type initiative_members_sum_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_var_pop_fieldsKeySpecifier = ('id' | initiative_members_var_pop_fieldsKeySpecifier)[];
export type initiative_members_var_pop_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_var_samp_fieldsKeySpecifier = ('id' | initiative_members_var_samp_fieldsKeySpecifier)[];
export type initiative_members_var_samp_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_members_variance_fieldsKeySpecifier = ('id' | initiative_members_variance_fieldsKeySpecifier)[];
export type initiative_members_variance_fieldsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_tagsKeySpecifier = ('id' | 'initiative' | 'initiative_id' | 'tag' | 'tagByTag' | initiative_tagsKeySpecifier)[];
export type initiative_tagsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	tag?: FieldPolicy<any> | FieldReadFunction<any>,
	tagByTag?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_tags_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiative_tags_mutation_responseKeySpecifier)[];
export type initiative_tags_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_thread_commentsKeySpecifier = ('comment' | 'created_at' | 'id' | 'initiative_thread_message' | 'message_id' | 'user' | 'user_id' | initiative_thread_commentsKeySpecifier)[];
export type initiative_thread_commentsFieldPolicy = {
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_message?: FieldPolicy<any> | FieldReadFunction<any>,
	message_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_thread_comments_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiative_thread_comments_mutation_responseKeySpecifier)[];
export type initiative_thread_comments_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_thread_messagesKeySpecifier = ('created_at' | 'id' | 'initiative_thread' | 'initiative_thread_comments' | 'message' | 'tender_id' | 'thread_id' | 'user' | 'user_id' | initiative_thread_messagesKeySpecifier)[];
export type initiative_thread_messagesFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	tender_id?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_thread_messages_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiative_thread_messages_mutation_responseKeySpecifier)[];
export type initiative_thread_messages_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_threadsKeySpecifier = ('context' | 'created_at' | 'goal' | 'id' | 'initiative' | 'initiative_id' | 'initiative_thread_messages' | 'problem' | initiative_threadsKeySpecifier)[];
export type initiative_threadsFieldPolicy = {
	context?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	goal?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	problem?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_threads_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiative_threads_mutation_responseKeySpecifier)[];
export type initiative_threads_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_visitsKeySpecifier = ('id' | 'initiative' | 'initiative_id' | 'user' | 'user_id' | 'visited_at' | initiative_visitsKeySpecifier)[];
export type initiative_visitsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	visited_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiative_visits_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiative_visits_mutation_responseKeySpecifier)[];
export type initiative_visits_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiativesKeySpecifier = ('created_at' | 'description' | 'files' | 'geom' | 'id' | 'image' | 'initiative_members' | 'initiative_members_aggregate' | 'initiative_tags' | 'initiative_threads' | 'initiative_visits' | 'modified_at' | 'name' | initiativesKeySpecifier)[];
export type initiativesFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	files?: FieldPolicy<any> | FieldReadFunction<any>,
	geom?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	modified_at?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type initiatives_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | initiatives_mutation_responseKeySpecifier)[];
export type initiatives_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type mutation_rootKeySpecifier = ('delete_files' | 'delete_files_by_pk' | 'delete_initiative_members' | 'delete_initiative_members_by_pk' | 'delete_initiative_tags' | 'delete_initiative_tags_by_pk' | 'delete_initiative_thread_comments' | 'delete_initiative_thread_comments_by_pk' | 'delete_initiative_thread_messages' | 'delete_initiative_thread_messages_by_pk' | 'delete_initiative_threads' | 'delete_initiative_threads_by_pk' | 'delete_initiative_visits' | 'delete_initiative_visits_by_pk' | 'delete_initiatives' | 'delete_initiatives_by_pk' | 'insert_files' | 'insert_files_one' | 'insert_initiative_members' | 'insert_initiative_members_one' | 'insert_initiative_tags' | 'insert_initiative_tags_one' | 'insert_initiative_thread_comments' | 'insert_initiative_thread_comments_one' | 'insert_initiative_thread_messages' | 'insert_initiative_thread_messages_one' | 'insert_initiative_threads' | 'insert_initiative_threads_one' | 'insert_initiative_visits' | 'insert_initiative_visits_one' | 'insert_initiatives' | 'insert_initiatives_one' | 'insert_tags' | 'insert_tags_one' | 'update_files' | 'update_files_by_pk' | 'update_initiative_members' | 'update_initiative_members_by_pk' | 'update_initiative_tags' | 'update_initiative_tags_by_pk' | 'update_initiative_thread_comments' | 'update_initiative_thread_comments_by_pk' | 'update_initiative_thread_messages' | 'update_initiative_thread_messages_by_pk' | 'update_initiative_threads' | 'update_initiative_threads_by_pk' | 'update_initiative_visits' | 'update_initiative_visits_by_pk' | 'update_initiatives' | 'update_initiatives_by_pk' | mutation_rootKeySpecifier)[];
export type mutation_rootFieldPolicy = {
	delete_files?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_files_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_members_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_thread_comments_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_thread_messages_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_threads_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiative_visits_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_initiatives_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_files?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_files_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_members_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_tags_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_thread_comments_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_thread_messages_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_threads_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiative_visits_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_initiatives_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_tags_one?: FieldPolicy<any> | FieldReadFunction<any>,
	update_files?: FieldPolicy<any> | FieldReadFunction<any>,
	update_files_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_members_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_thread_comments_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_thread_messages_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_threads_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiative_visits_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	update_initiatives_by_pk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type org_projectsKeySpecifier = ('created_at' | 'description' | 'id' | 'org' | 'org_id' | 'user' | 'user_id' | org_projectsKeySpecifier)[];
export type org_projectsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	org?: FieldPolicy<any> | FieldReadFunction<any>,
	org_id?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type org_tagsKeySpecifier = ('id' | 'org' | 'org_id' | 'tagByTag' | org_tagsKeySpecifier)[];
export type org_tagsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	org?: FieldPolicy<any> | FieldReadFunction<any>,
	org_id?: FieldPolicy<any> | FieldReadFunction<any>,
	tagByTag?: FieldPolicy<any> | FieldReadFunction<any>
};
export type orgsKeySpecifier = ('created_at' | 'description' | 'geom' | 'id' | 'org_projects' | 'org_tags' | orgsKeySpecifier)[];
export type orgsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	geom?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	org_projects?: FieldPolicy<any> | FieldReadFunction<any>,
	org_tags?: FieldPolicy<any> | FieldReadFunction<any>
};
export type query_rootKeySpecifier = ('files' | 'files_by_pk' | 'i18n' | 'i18n_by_pk' | 'i18n_categories' | 'i18n_categories_by_pk' | 'initiative_distance' | 'initiative_members' | 'initiative_members_aggregate' | 'initiative_members_by_pk' | 'initiative_tags' | 'initiative_tags_by_pk' | 'initiative_thread_comments' | 'initiative_thread_comments_by_pk' | 'initiative_thread_messages' | 'initiative_thread_messages_by_pk' | 'initiative_threads' | 'initiative_threads_by_pk' | 'initiative_visits' | 'initiative_visits_by_pk' | 'initiatives' | 'initiatives_by_pk' | 'initiatives_nearby' | 'org_projects' | 'org_projects_by_pk' | 'org_tags' | 'org_tags_by_pk' | 'orgs' | 'orgs_by_pk' | 'tags' | 'tags_by_pk' | 'users' | 'users_by_pk' | query_rootKeySpecifier)[];
export type query_rootFieldPolicy = {
	files?: FieldPolicy<any> | FieldReadFunction<any>,
	files_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_categories?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_categories_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_distance?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_comments_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_messages_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_threads_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives_nearby?: FieldPolicy<any> | FieldReadFunction<any>,
	org_projects?: FieldPolicy<any> | FieldReadFunction<any>,
	org_projects_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	org_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	org_tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	orgs?: FieldPolicy<any> | FieldReadFunction<any>,
	orgs_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	users_by_pk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type subscription_rootKeySpecifier = ('files' | 'files_by_pk' | 'i18n' | 'i18n_by_pk' | 'i18n_categories' | 'i18n_categories_by_pk' | 'initiative_distance' | 'initiative_members' | 'initiative_members_aggregate' | 'initiative_members_by_pk' | 'initiative_tags' | 'initiative_tags_by_pk' | 'initiative_thread_comments' | 'initiative_thread_comments_by_pk' | 'initiative_thread_messages' | 'initiative_thread_messages_by_pk' | 'initiative_threads' | 'initiative_threads_by_pk' | 'initiative_visits' | 'initiative_visits_by_pk' | 'initiatives' | 'initiatives_by_pk' | 'initiatives_nearby' | 'org_projects' | 'org_projects_by_pk' | 'org_tags' | 'org_tags_by_pk' | 'orgs' | 'orgs_by_pk' | 'tags' | 'tags_by_pk' | 'users' | 'users_by_pk' | subscription_rootKeySpecifier)[];
export type subscription_rootFieldPolicy = {
	files?: FieldPolicy<any> | FieldReadFunction<any>,
	files_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_categories?: FieldPolicy<any> | FieldReadFunction<any>,
	i18n_categories_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_distance?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_comments_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_messages_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_threads_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives_nearby?: FieldPolicy<any> | FieldReadFunction<any>,
	org_projects?: FieldPolicy<any> | FieldReadFunction<any>,
	org_projects_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	org_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	org_tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	orgs?: FieldPolicy<any> | FieldReadFunction<any>,
	orgs_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	tags_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	users_by_pk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type tagsKeySpecifier = ('initiative_tags' | 'org_tags' | 'tag' | tagsKeySpecifier)[];
export type tagsFieldPolicy = {
	initiative_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	org_tags?: FieldPolicy<any> | FieldReadFunction<any>,
	tag?: FieldPolicy<any> | FieldReadFunction<any>
};
export type tags_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | tags_mutation_responseKeySpecifier)[];
export type tags_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type usersKeySpecifier = ('avatar_url' | 'created_at' | 'display_name' | 'files' | 'id' | 'initiative_members' | 'initiative_members_aggregate' | 'initiative_thread_comments' | 'initiative_thread_messages' | 'initiative_visits' | 'org_projects' | 'updated_at' | usersKeySpecifier)[];
export type usersFieldPolicy = {
	avatar_url?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	display_name?: FieldPolicy<any> | FieldReadFunction<any>,
	files?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_members_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_thread_messages?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative_visits?: FieldPolicy<any> | FieldReadFunction<any>,
	org_projects?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	files?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | filesKeySpecifier | (() => undefined | filesKeySpecifier),
		fields?: filesFieldPolicy,
	},
	files_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | files_mutation_responseKeySpecifier | (() => undefined | files_mutation_responseKeySpecifier),
		fields?: files_mutation_responseFieldPolicy,
	},
	i18n?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | i18nKeySpecifier | (() => undefined | i18nKeySpecifier),
		fields?: i18nFieldPolicy,
	},
	i18n_categories?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | i18n_categoriesKeySpecifier | (() => undefined | i18n_categoriesKeySpecifier),
		fields?: i18n_categoriesFieldPolicy,
	},
	initiative_distance?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_distanceKeySpecifier | (() => undefined | initiative_distanceKeySpecifier),
		fields?: initiative_distanceFieldPolicy,
	},
	initiative_members?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_membersKeySpecifier | (() => undefined | initiative_membersKeySpecifier),
		fields?: initiative_membersFieldPolicy,
	},
	initiative_members_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_aggregateKeySpecifier | (() => undefined | initiative_members_aggregateKeySpecifier),
		fields?: initiative_members_aggregateFieldPolicy,
	},
	initiative_members_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_aggregate_fieldsKeySpecifier | (() => undefined | initiative_members_aggregate_fieldsKeySpecifier),
		fields?: initiative_members_aggregate_fieldsFieldPolicy,
	},
	initiative_members_avg_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_avg_fieldsKeySpecifier | (() => undefined | initiative_members_avg_fieldsKeySpecifier),
		fields?: initiative_members_avg_fieldsFieldPolicy,
	},
	initiative_members_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_max_fieldsKeySpecifier | (() => undefined | initiative_members_max_fieldsKeySpecifier),
		fields?: initiative_members_max_fieldsFieldPolicy,
	},
	initiative_members_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_min_fieldsKeySpecifier | (() => undefined | initiative_members_min_fieldsKeySpecifier),
		fields?: initiative_members_min_fieldsFieldPolicy,
	},
	initiative_members_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_mutation_responseKeySpecifier | (() => undefined | initiative_members_mutation_responseKeySpecifier),
		fields?: initiative_members_mutation_responseFieldPolicy,
	},
	initiative_members_stddev_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_stddev_fieldsKeySpecifier | (() => undefined | initiative_members_stddev_fieldsKeySpecifier),
		fields?: initiative_members_stddev_fieldsFieldPolicy,
	},
	initiative_members_stddev_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_stddev_pop_fieldsKeySpecifier | (() => undefined | initiative_members_stddev_pop_fieldsKeySpecifier),
		fields?: initiative_members_stddev_pop_fieldsFieldPolicy,
	},
	initiative_members_stddev_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_stddev_samp_fieldsKeySpecifier | (() => undefined | initiative_members_stddev_samp_fieldsKeySpecifier),
		fields?: initiative_members_stddev_samp_fieldsFieldPolicy,
	},
	initiative_members_sum_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_sum_fieldsKeySpecifier | (() => undefined | initiative_members_sum_fieldsKeySpecifier),
		fields?: initiative_members_sum_fieldsFieldPolicy,
	},
	initiative_members_var_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_var_pop_fieldsKeySpecifier | (() => undefined | initiative_members_var_pop_fieldsKeySpecifier),
		fields?: initiative_members_var_pop_fieldsFieldPolicy,
	},
	initiative_members_var_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_var_samp_fieldsKeySpecifier | (() => undefined | initiative_members_var_samp_fieldsKeySpecifier),
		fields?: initiative_members_var_samp_fieldsFieldPolicy,
	},
	initiative_members_variance_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_members_variance_fieldsKeySpecifier | (() => undefined | initiative_members_variance_fieldsKeySpecifier),
		fields?: initiative_members_variance_fieldsFieldPolicy,
	},
	initiative_tags?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_tagsKeySpecifier | (() => undefined | initiative_tagsKeySpecifier),
		fields?: initiative_tagsFieldPolicy,
	},
	initiative_tags_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_tags_mutation_responseKeySpecifier | (() => undefined | initiative_tags_mutation_responseKeySpecifier),
		fields?: initiative_tags_mutation_responseFieldPolicy,
	},
	initiative_thread_comments?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_thread_commentsKeySpecifier | (() => undefined | initiative_thread_commentsKeySpecifier),
		fields?: initiative_thread_commentsFieldPolicy,
	},
	initiative_thread_comments_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_thread_comments_mutation_responseKeySpecifier | (() => undefined | initiative_thread_comments_mutation_responseKeySpecifier),
		fields?: initiative_thread_comments_mutation_responseFieldPolicy,
	},
	initiative_thread_messages?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_thread_messagesKeySpecifier | (() => undefined | initiative_thread_messagesKeySpecifier),
		fields?: initiative_thread_messagesFieldPolicy,
	},
	initiative_thread_messages_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_thread_messages_mutation_responseKeySpecifier | (() => undefined | initiative_thread_messages_mutation_responseKeySpecifier),
		fields?: initiative_thread_messages_mutation_responseFieldPolicy,
	},
	initiative_threads?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_threadsKeySpecifier | (() => undefined | initiative_threadsKeySpecifier),
		fields?: initiative_threadsFieldPolicy,
	},
	initiative_threads_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_threads_mutation_responseKeySpecifier | (() => undefined | initiative_threads_mutation_responseKeySpecifier),
		fields?: initiative_threads_mutation_responseFieldPolicy,
	},
	initiative_visits?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_visitsKeySpecifier | (() => undefined | initiative_visitsKeySpecifier),
		fields?: initiative_visitsFieldPolicy,
	},
	initiative_visits_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiative_visits_mutation_responseKeySpecifier | (() => undefined | initiative_visits_mutation_responseKeySpecifier),
		fields?: initiative_visits_mutation_responseFieldPolicy,
	},
	initiatives?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiativesKeySpecifier | (() => undefined | initiativesKeySpecifier),
		fields?: initiativesFieldPolicy,
	},
	initiatives_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | initiatives_mutation_responseKeySpecifier | (() => undefined | initiatives_mutation_responseKeySpecifier),
		fields?: initiatives_mutation_responseFieldPolicy,
	},
	mutation_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | mutation_rootKeySpecifier | (() => undefined | mutation_rootKeySpecifier),
		fields?: mutation_rootFieldPolicy,
	},
	org_projects?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | org_projectsKeySpecifier | (() => undefined | org_projectsKeySpecifier),
		fields?: org_projectsFieldPolicy,
	},
	org_tags?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | org_tagsKeySpecifier | (() => undefined | org_tagsKeySpecifier),
		fields?: org_tagsFieldPolicy,
	},
	orgs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | orgsKeySpecifier | (() => undefined | orgsKeySpecifier),
		fields?: orgsFieldPolicy,
	},
	query_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | query_rootKeySpecifier | (() => undefined | query_rootKeySpecifier),
		fields?: query_rootFieldPolicy,
	},
	subscription_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | subscription_rootKeySpecifier | (() => undefined | subscription_rootKeySpecifier),
		fields?: subscription_rootFieldPolicy,
	},
	tags?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | tagsKeySpecifier | (() => undefined | tagsKeySpecifier),
		fields?: tagsFieldPolicy,
	},
	tags_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | tags_mutation_responseKeySpecifier | (() => undefined | tags_mutation_responseKeySpecifier),
		fields?: tags_mutation_responseFieldPolicy,
	},
	users?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | usersKeySpecifier | (() => undefined | usersKeySpecifier),
		fields?: usersFieldPolicy,
	}
};

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    