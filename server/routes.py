from api.api import Notes_API, Note_API, Auth_API, version as api_v



def initialize_routes(api):
	api.add_resource(Auth_API, f'/api/v{api_v}/signin')
	api.add_resource(Notes_API, f'/api/v{api_v}/notes')
	api.add_resource(Note_API, f'/api/v{api_v}/note/<int:id>')
