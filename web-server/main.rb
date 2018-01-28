require 'sinatra'
require 'date'
require 'json'
require 'mysql2'
require 'yaml'

enable :sessions

require_relative 'db'
require_relative 'authentication'
require_relative 'api'

# メインページ
get '/' do
  if(session[:user].nil?)
    redirect '/login'
  end
  erb :index
end
