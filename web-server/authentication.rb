require 'digest/sha1'
############## ログイン

get '/login' do
  erb :login
end

post '/login' do
  id = params[:id]
  pass = generate_password(params[:password])
  # sql = "SELECT id,password_digest FROM user"
  user_pass = User.find(id).password_digest
  session[:user] = user[:id] if pass == user_pass
  redirect '/'
end

post '/logout' do
  session.clear
  redirect '/login'
end

def generate_password(password)
  salt = 'nekonote'
  Digest::SHA1.hexdigest("#{salt}#{password}")
end
