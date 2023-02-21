from api.api import Notes_API, Note_API, version



def initialize_routes(api):
	api.add_resource(Notes_API, f'/api/v{version}/notes')
	api.add_resource(Note_API, f'/api/v{version}/note/<id>')
