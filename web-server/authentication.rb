require 'digest/sha1'
############## ログイン

get '/login' do
  erb :login
end

post '/login' do
  id = params[:id]
  pass = generate_password(params[:password])
  sql = "SELECT id,password_digest FROM user"
  user = select_db(sql).first
  user_pass = user[:password_digest]
  if(pass == user_pass)
    session[:user] = user[:id]
  end
  redirect "/"
end

post '/logout' do
  session.clear
  redirect '/login'
end

def generate_password(password)
  salt = "nekonote"
  Digest::SHA1.hexdigest("#{salt}#{password}")
end
