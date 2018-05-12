require 'active_record'
require 'yaml'
require 'pp'

pp YAML.load_file('database.yml')

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection(:development)

class Equipment <ActiveRecord::Base
end

class Role < ActiveRecord::Base
end

class User < ActiveRecord::Base
end

def generate_password(password)
  salt = "nekonote"
  Digest::SHA1.hexdigest("#{salt}#{password}")
end

now = Time.now
puts now.strftime('%Y/%m/%d %H:%M:%S')  #2014/09/06 16:29:32

user = User.new(
  name: 'debug2'
)
user.save

users = User.all

pp users

# def connect_db(sql, &block)
#   client = Mysql2::Client.new(YAML.load_file('database.yml'))
#   result = yield(client, sql)
#   client.close
#   result
# end

# def select_db(sql)
#   ary = []
#   connect_db(sql) do |client, sql|
#     client.query(sql).each { |row| ary << row }
#   end
#   ary
# end

# def insert_db(sql)
#   result = connect_db(sql) do |client, sql|
#     client.query(sql)
#   end
#   result
# end
