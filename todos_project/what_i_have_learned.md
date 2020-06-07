What I Have Learned
=====
A quick summary of things to outline some takeaways
-----

### PostGresSQL Issues
Installing this was a b****!
Edit after encountering problem 2: Postgres can just be a b**** in and of itself!
1. Problem during installation
   #### Problem description:
   I was having was that I was not able to open the postgres shell. Permission was denied (which I had saved the error), but I basically couldn't get into the shell using either of the following commands: `psql postgres` or `sudo -u postgres psql`. Apparently there's a default user postgres that just gets created when you brew install, but I didn't have access to this.

   #### Summary of solution:
   I ended up having postgres installed in two locations. I'm not sure if this was from mistakes in installing it (I tried both the web download and using homebrew) or if it was from a previous download on my computer that I forgot about, but it was in two locations. The second location that took a while to find was `/usr/local/tmp/postgres`, iirc. I went to remove that folder, and turns out I didn't have permission to do that. Somehow there was another user on my computer (named **postgres**) that had access to it. Before using sudo to destroy the directory, we wanted to see if fixing things in there would allow it to work. there was some file with the port 5432 and another lock file for that that was creating some error at that point. Ended up deleting those, still couldn't open the shell, and so we ended up just `sudo` removing those files, and then starting over with `brew install postgres` and it worked.

2. Problem when I was on a new ip address for the first time (CA -> AZ)
	* NOTE: I don't know if the IP address is related to the problem at all, but it's one of the only distinctions I could make at the time.
   #### Problem description:
   This occurred midway through the project. I ran `python manage.py runserver` to get the server up and running os I could open the webpage, and I got this new error I hadn't seen before:
   	```
   	File ".../envs/django_todos/lib/python3.7/site-packages/psycopg2/__init__.py", line 127, in connect
       conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
   django.db.utils.OperationalError: could not connect to server: Connection refused
   	Is the server running on host "127.0.0.1" and accepting
   	TCP/IP connections on port 5432?
   	```
   
   #### Summary of Solution
   Found this link: https://stackoverflow.com/questions/29937378/django-db-utils-operationalerror-could-not-connect-to-server
     * Tried option 1 and 2, didn't seem to have postgres running
     * For option 3, nothing had changed in my database
     * Tried option 4. The command `pg_resetxlog` was was no longer supported on this version of postgres (12.2 I believe), so found the updated command `pg_resetwal` instead:
         ```
         ❯ pg_resetwal -f usr/local/var/postgres
         pg_resetwal: error: lock file "postmaster.pid" exists
         pg_resetwal: Is a server running?  If not, delete the lock file and try again.
         ```

      * Turns out I missed a step in step 4! I didn't remove the `postmaster.pid` file. After removing that, and then running the `pg_resetwal ...` command again, I was able to restart postgres with `brew services restart postgres` and start the Python server with `python manage.py runserver` and it worked.

   #### What actually happened?
   From that extremley helpful Stack Overflow, what I think happened was an improper shutdown, and thus the `postmaster.pid` file didn't get deleted? Because that file existed, my system thought postgres was running even when it wasn't. So when I would run `brew services start postgresql`, it would say it was already running, but when I would grep for postgres (`ps -ef | grep postgres`), I couldn't find a process. By removing that file and "resetting the write-ahead log and other control information" (`ps_resetwal` command), I could then start postgres again.

### Django process
I'll do a quick summary of the steps I followed to create my Todo List app. I followed a mixture of tutorials, ordered respectively by how much I used them: https://medium.com/technest/build-a-crud-todo-app-with-django-and-react-redux-8ddb0b6ac2f0, https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react, https://docs.djangoproject.com/en/3.0/intro/tutorial01/, https://djangocentral.com/using-postgresql-with-django/, https://tutorial-extensions.djangogirls.org/en/optional_postgresql_installation/, and https://www.valentinog.com/blog/drf/.

#### Other helpful links throughout project
* Medium article about how `async` and `await` work in JS: https://medium.com/siliconwat/how-javascript-async-await-works-3cab4b7d21da
* React docs: https://reactjs.org/tutorial/tutorial.html#what-is-react
* Info about actions and reducers in redux: https://redux.js.org/basics/reducers
* Keys in React: https://reactjs.org/docs/lists-and-keys.html#keys
#### Backend/APIs
1. There was actually quite a bit of confusion from a file structure perspective between two of the main project tutorials (https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react and https://www.valentinog.com/blog/drf/) and which commands to use (`python manage.py startapp [app_name]` vs `django-admin startapp [app_name]`), but I ended up using the first tutorial, because it aligned with the Django docs.
2. Basically followed everything from this tutorial to setup postgres with django, except for `ENGINE` I didn't include "psycopg2" at the end, so my opening line in `settings.py` was: `'ENGINE': 'django.db.backends.postgresql'`.
   * It took a while to figure out whether I should run `python manage.py migrate` right after editing these settings, because the order in the official Django docs tutorial (https://docs.djangoproject.com/en/3.0/intro/tutorial01/) does stuff with views first. But I realized I haven't set up my other personal projects with views first, and I wanted to make sure the database was working, so I ran the migration and it didn't fail, so I was in the clear.

2. Next was making and activating the models. The order shouldn't matter, but you'll need both (activate it and migrate the new models) in order to use them in the shell, which you can test out at the end.
   1. In order to include the app in the project, we need to add it to the `INSTALLED_APPS` list in `todo_list/settings.py`. There was some confusion on just adding the name of the app vs the dotted path to the config, but the Django docs tutorial explained that the `TodoListConfig` class was in the `todo_list.apps.py` file, and since I found that and it mirrored the docs tutorial, I followed that (rather than just the app name from https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react). So installed apps looked like this:
   ```
   INSTALLED_APPS = [
      'todo_list.apps.TodoListConfig', # activate the app (name comes from `todo_list/apps.py`)
      'django.contrib.admin',
      'django.contrib.auth',
      'django.contrib.contenttypes',
      'django.contrib.sessions',
      'django.contrib.messages',
      'django.contrib.staticfiles',
   ]
   ```
   2. Create your model in the `models.py` file.

3. Setup the Django admin interface (not a requirement, but useful). Followed https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react here exactly.
4. Next up is APIs. I found other helpful looking tutorials (https://learndjango.com/tutorials/official-django-rest-framework-tutorial-beginners because I was looking up the Python package `djangorestframework` because it appeared in all the tutorials except the django docs one, and https://medium.com/technest/build-a-crud-todo-app-with-django-and-react-redux-8ddb0b6ac2f0 because I thought I should probably use redux again). But we didn't cover APIs in Django docs, so maybe this `djangorestframework` is necessary for all of it.
5. **Serializers**: transform model instances to JSON so the frontend can easily use the JSON response.
   1. Make a `serializers.py` file in `todo_list/`.
   2. Make a `TodoSerializer` that inherits from `serializers.ModelSerializers`.
   3. Make `Meta` subclass under the `TodoSerializer`, and specifie the model to work with and the fields we want converted to JSON.
6. `todo_list/views.py`
   1. Import `viewsets` from `rest_framework`
      * `viewsets` provide default CRUD implementation, we just need to specify the serializer
7. URLs and router
   1. Create a URLconf (URL configuration) file use `rest_framework.routers` to register the `TodoViewSet` to the router.
      * Then, `urlpatterns = routers.urls`
   2. In the top level `todos_project/urls.py`, Structure these routes under a path with `...api/`
      * Can now got to `.../api/todos` and `.../api/todos/<id>`

***NOTE***: started using https://medium.com/technest/build-a-crud-todo-app-with-django-and-react-redux-8ddb0b6ac2f0 predominantly when frontend began because I didn't want to use `create-react-app` as used in https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react.

#### Frontend/React
1. Introduce npm, react, etc. (following from https://medium.com/technest/build-a-crud-todo-app-with-django-and-react-redux-8ddb0b6ac2f0)
   1. Run `python manage.py startapp frontend`
   2. Set up react/redux with the directories we want:
      ```
      mkdir -p ./frontend/src/{components,actions,reducers}
      $ mkdir -p ./frontend/{static,templates}/frontend
      ```
   3. `npm init -y` in top level project directory to create `package.json` file
      * So `package.json`, `frontend/`, `todo_list/`, and `todos_project/` are at same level in file tree
   6. Packages (optional in [])
      * `npm i -D webpack webpack-cli`
      * `npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react [@babel/plugin-proposal-class-properties]`
      * `npm i react react-dom react-router-dom`
      * `npm i redux react-redux redux-thunk redux-devtools-extension`
      * `npm i redux-form`
      * `npm i axios`
      * `npm i lodash`
   5. Create `.babelrc` which enables us to use `Async/Await`
   6. Create `webpack.config.js`
   7. Edit scripts file in `package.json`
      * This creates scripts for `npm run dev` and `npm run build`, which both have webpack bundle the modules and output the `main.js` file for the respective environments.
   8. React:
      **NOTE**: in the tutorial, they created a separate frontend app to run all this stuff through. will check later if it's possible to do through just the backend url and views.
      * Since we are creating a new app (`python manage.py startapp frontend`), we will need to include the new app in the `INSTALLED_APPS` (in `settings.py`).
      Create the first react files:
      1. `frontend/src/index.js`
         *  This is where we'll connect from React to Python
      2. Create template file in frontend `frontend/templates/frontend/index.html`, and put `<div>` element with `root=id`.
         * In the `index.js` file, this line allows us to hook the React component we will create (`app.js`) to the HTML template: `ReactDOM.render(<App />, document.getElementById('root'));`
      3. `frontend/src/app.js`:
         *  Create parent react componenet `App` and export it at the end of the file
      4. `templates/frontend/index.html`

   At this point, was able to load `http://localhost:8000/` and see the DOM from `app.js`

2. Redux
   1. Actions (and Action Creators)
      * **Actions** are payloads of information that send data from the app to the store (def from Redux docs), and they are just POJOs.
      * **Action Creators** are, thus, functions that return actions.
        * This means that they just return the POJOs. The fact that we are automatically dispatching the action in our action creator function means we are actually returning a **Bound Action Creator** (https://redux.js.org/basics/actions/).
   2. **Reducers**: specify how the application's in response to actions sent ot the store (https://redux.js.org/basics/reducers).
      1. We need to make sure to make a parent reducer (`root_reducer.js`)where we can implement `combineReducers` to combine all the reducers. In order to use the `redux-form` package, we want to include its reducer in the `combineReducers` function.
   3. **Store**: an object that holds the state of the application.
      1. Use recommended middleware `redux-thunk` for async logic (learn why thunks are important)
         1. Learn to use Redux DevTools
   4. Components
      * Tutorial has `mapStateToProps` and `connect()` function in the component. I think I used to do this in a dispatcher file.
      1. Make TodoList
      2. Make Dashboard
      3. Update `app.js` to include the provider and store, and put the top level component (in this case the dashbaord) in the provider. The provider makes the store available to the component nested inside of it.
3. More Frontend stuff
   1. `CREATE_TODO`
      1. action creator
      2. reducer
      3. form component
         1. find out how redux form works (https://redux-form.com/)
   2. Created a header under layout (non-functional for this tutorial)
      * added this header to `app.js`
   3. Removing Todos `DELETE_TODO`
      1. create a history object
         * used for changing current location, we will use this after deleteing a todo
      2. actions
      3. reducers
         * `GET_TODO` is the same as `CREATE_TODO`, so just need to list the case
      4. delete todo modal
         * put this in the todo list component
   4. Configure react router in `app.js`
   5. Editing Todos `EDIT_TODO`
      1. action creator
      2. reducer
      3. `todo_edit.js`
         * add component and route to `app.js`
         * update `btnText` to be conditional in the `todo_form`.

#### Issues
   * Inability to create new Todo with the CREATE TODO button in the UI
     * Since I had my own goals with the todos app, I madea a `title` and a `description` field in the Django models. As a result, I didn't realize that I didn't make description optional, and so when I was trying to submit the new Todo, it was failing because it was not sending a description to the API.
       * Although, I troubleshooted this the hard way with guess and check because I didn't see this in the server logs and I do not yet know the equivalent of Ruby's `byebug` in Python, so I need to figure that out. I also need to figure out how to show the errors in the server logs, because that would make things much easier
     * I also had `axios.get` instead of `axios.post` for the `CREATE_TODO` action, so originally it was not posting the data. I had to fix both of these things to be able to create a new todo with the UI.