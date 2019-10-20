import graphene
from posts.schema import Query as post_query
from posts.schema import Mutation as post_mutation

class Query(post_query):
    pass

class Mutation(post_mutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
