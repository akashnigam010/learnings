Elastic Search
===

- Open source, scalable, high speed, no-sql search engine
- Document-oriented, schema-less databse engine designed to create, update and search data
- Near Real Time - a small time gap between when the data is indexed and when it is available to search
- Uses apache lucene internally
- Indexing a data means adding it to the scope of ES to be searched later
- ES provides REST api for
    - Indexing
    - Getting
    - Searching
    - Mapping data
- Has its own query domain specific language (DSL)

*Node*
A node is a single instance running and participating in ES

*Cluster*
More than one nodes working together

*Index*
Related documents

*Shard*
A subset of index

API
---

- POST - create a new document
- PUT - update an existing document or create a new one (passing id is mandatory)
- First time a document is POSTed, an index is created and the doc is added to it.
- We can create an index alone when passed with a settings object (PUT)
- use `_bulk` to bulk index documents
- `_search` to get all results in an index
```
GET /inspections/_search
```

- filter using query DSL
```
GET /inspections/_search
{
    "query": {
        "match": {
            "business_name": "soup"
        }
    }
}
```
- `Score` tells the relevancy of a search result


Query DSL
---

**Query Context and Filter Context**

- Query context
    How well does this document match the query clause
    A score is calculated to point out the relevance

- Filter context
    Does this document match the query clause
    No score is calculated

```
GET /customers/_search
{
    "query": {
        "bool": {
            "must": [
                "match": { "title": "search" },
                "match": { "content": "es" },
            ],
            "filter": [
                "term": { "status": "published" },
                "range": { "timestamp": { "gte": "2019-01-01" } }
            ]
        }
    }
}
```
- query context
- bool and must are used in query context - decide how well a document matches the must clauses (_scored)
- term and range are in filter context
- do not decide the score, just filter out the docs which do not pass the filter clauses

#match_all

Matches all docs

```
    query: {
        match_all: {}
    }
```

#match_none

Matches no docs
```
    query: {
        match_none: {}
    }
```

Full text queries
---

- FTQs do a analyze of the search term
- Used for full text search like search in email body

Ex: match, match_phrase

Term queries
---

- Unline FTQs, Term queries do not analyze the search terms, instead do an exact match stored in the field
- Run in filter context

Bool Queries
---

- Run in the query context - end in score
    - must
    - filter
    - should
    - must_not
