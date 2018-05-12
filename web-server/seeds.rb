require 'pp'
require 'active_record'

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
datetime = now.strftime('%Y/%m/%d %H:%M:%S') # 2014/09/06 16:29:32

# 備品カテゴリ
# camera = EquipmentCategory.new(
#   name: 'カメラ'
# )
# hdd = EquipmentCategory.new(
#   name: 'ハードディスク'
# )
# camera.save
# hdd.save
pp EquipmentCategory.all

# 備品登録
# camera_a = Equipment.new(
#   name: 'カメラA',
#   category: 1
# )
# camera_b = Equipment.new(
#   name: 'カメラB',
#   category: 1
# )
# hdd_a = Equipment.new(
#   name: 'ハードディスクA',
#   category: 2
# )
# camera_a.save
# camera_b.save
# hdd_a.save
pp Equipment.all

# 施設登録
# facility01 = Facility.new(
#   name: '会議室A'
# )
# facility02 = Facility.new(
#   name: '会議室B'
# )
# facility01.save
# facility02.save

pp Facility.all

require 'json'

user_schedules = UserSchedule.all.where(user_id: 1)
pp user_schedules.to_json

# user = User.new(
#   name: 'debugger',
#   email: 'example@example.com',
#   password_digest: generate_password('debugger'),
#   evaluation: 0,
#   role: 1,
#   created_at: datetime,
#   updated_at: datetime
# )
# user.save

# user = User.find(1)
# pp user.password_digest
# pp generate_password('debugger')
