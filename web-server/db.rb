require 'active_record'
require 'pp'

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection(:development)

class EquipmentCategory < ActiveRecord::Base
end
class Equipment < ActiveRecord::Base
end
class EquipmentReservationSchedule < ActiveRecord::Base
end
class Facility < ActiveRecord::Base
end
class FacilityReservationSchedule < ActiveRecord::Base
end
class Role < ActiveRecord::Base
end
class User < ActiveRecord::Base
end
class UserSchedule < ActiveRecord::Base
end

def generate_password(password)
  salt = 'nekonote'
  Digest::SHA1.hexdigest("#{salt}#{password}")
end

now = Time.now
datetime = now.strftime('%Y/%m/%d %H:%M:%S')  #2014/09/06 16:29:32

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
