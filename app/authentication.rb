require 'digest/sha1'
############## ログイン

get '/login' do
  redirect '/' if session[:user]
  erb :login
end

post '/login' do
  id = params[:username]
  pass = generate_password(params[:password])
  redirect '/login' unless id || pass # TODO: IDかPassを入力していない旨を伝える

  user = User.find_by_id(id)
  redirect '/login' if user.nil?      # TODO: IDかPassが間違っている旨を伝える

  user_pass = user.password_digest
  session[:user] = user.id if pass == user_pass
  p "#{session[:user]} / #{Time.now}"

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
