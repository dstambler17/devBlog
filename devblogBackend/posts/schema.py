import graphene
from graphene_django.types import DjangoObjectType
from .models import Post

class PostType(DjangoObjectType):
    class Meta:
        model = Post

class Query(graphene.ObjectType):
    all_posts = graphene.List(PostType)
    post = graphene.Field(PostType, post_title=graphene.String(required=True))


    def resolve_all_posts(self, info, **kwargs):
        return Post.objects.all()

    def resolve_post(self, info, post_title):
        # Querying a single question
        return Post.objects.get(title=post_title)


class UpdatePost(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        likeUpdate = graphene.Boolean(required=True)
        title = graphene.String(required=True)

    # The class attributes define the response of the mutation
    post = graphene.Field(PostType)

    def mutate(self, info, likeUpdate, title):
        post = Post.objects.get(title=title)
        if likeUpdate:
            post.likes = post.likes + 1
        else:
            post.likes = post.likes - 1 if post.likes > 0 else 0
        post.save()
        # Notice we return an instance of this mutation
        return UpdatePost(post=post)

class CreatePost(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        title = graphene.String(required=True)

    # The class attributes define the response of the mutation
    post = graphene.Field(PostType)

    def mutate(self, info, title):
        post = Post.objects.create(
            title=title, likes = 0
        )
        return CreatePost(post=post)

class DeletePost(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    post = graphene.Field(PostType)

    def mutate(self, info, id):
        Post.objects.filter(pk=id).delete()
        return DeletePost()


class Mutation(graphene.ObjectType):
    update_post = UpdatePost.Field()
    insert_post = CreatePost.Field()
    delete_post = DeletePost.Field()
