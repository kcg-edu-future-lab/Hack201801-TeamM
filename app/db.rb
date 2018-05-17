require 'active_record'

ActiveRecord::Base.configurations = YAML.load_file(File.dirname(__FILE__) + '/database.yml')
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
