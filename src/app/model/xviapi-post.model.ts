export interface QueryModel {
  indexes: string;
  columns: string;
  body: Body;
}

export interface Body {
  query: Query;
  from: number;
  size: number;
  sort: any[];
}

export interface Query {
  bool: Bool;
}

export interface Bool {
  must: Must[];
  must_not: MustNot[];
}

export interface Must {
  wildcard: any;
}

export interface MustNot {
  wildcard: any;
}
