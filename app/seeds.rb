require 'pp'
require 'active_record'
require 'json'

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection(:development)

class EquipmentCategory < ActiveRecord::Base
end
class Equipment < ActiveRecord::Base
end
class EquipmentReservationSchedule < ActiveRecord::Base
end
class FacilityCategory < ActiveRecord::Base
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
# EquipmentCategory.create(
#   name: 'カメラ'
# )
# EquipmentCategory.create(
#   name: 'ハードディスク'
# )
# pp EquipmentCategory.all

# 備品登録
# Equipment.create(
#   name: 'カメラA',
#   category: 1
# )
# Equipment.create(
#   name: 'カメラB',
#   category: 1
# )
# Equipment.create(
#   name: 'ハードディスクA',
#   category: 2
# )
# pp Equipment.all

# 施設カテゴリ
# FacilityCategory.create(
#   name: '会議室'
# )

# 施設登録
# Facility.create(
#   name: '会議室A',
#   category: 1
# )
# Facility.create(
#   name: '会議室B',
#   category: 1
# )

pp Facility.all

# user_schedules = UserSchedule.all.where(user_id: 1)
# pp user_schedules.to_json

# User.create(
#   id: 'debugger',
#   name: 'デバッガ',
#   email: 'example@example.com',
#   password_digest: generate_password('debugger'),
#   evaluation: 0,
#   role: 1,
#   created_at: datetime,
#   updated_at: datetime
# )

# user = User.find_by_id('aa')
# pp user
# pp generate_password('debugger')
