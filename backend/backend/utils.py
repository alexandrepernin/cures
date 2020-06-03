from cures.serializers import UserSerializer

# Define a new JMT reponse payload handler to be able to send back more than just the token with the response.
def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
