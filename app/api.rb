require 'pony'

############## API

before do
  headers 'Access-Control-Allow-Origin' => '*'
end
# :useridスケジュール
get '/api/v1/schedule/:id' do
  user_schedules = UserSchdule.all.where(user_id: params[:id])
  user_schedules.to_json
end
# :user_schedule追加
post '/api/v1/schedule/:id' do
  stime = params[:stime]
  etime = params[:etime]
  name = params[:name]
  UserSchedule.create(
    user_id: params[:id],
    name: name,
    start_time: stime,
    end_time: etime
  )
end

# 備品予約取得
get '/api/v1/reservation/equipment' do
  category = params[:category]
  # sql = "SELECT equipment.name, project_id, start_date, end_date FROM equipment_reservation INNER JOIN equipment ON equipment.id = equipment_reservation.equipment_id WHERE equipment_id = '#{category}'"
  reservation = EquipmentReservationSchedule.all.joins(:equipment).select(
    'equipment_reservation_schedules.*, equipment.*').where(category_id: category)
  reservation.to_json
end
# 備品予約追加
post '/api/v1/reservation/equipment' do
  eid = params[:eid]
  # pid = params[:pid]
  stime = params[:stime]
  etime = params[:etime]
  reservation = EquipmentReservationSchedule.new(
    equipment_id: eid,
    start_date: stime,
    end_date: etime
  )
  reservation.save
end

# 備品詳細
get '/api/v1/equipment' do
  EquipmentCategory.all.map do |category|
    equipments = Equipment.all.where(category: category.id)
    types = equipments.map { |e| { 'name' => e.name } }
    { 'name' => category.name, 'type' => types }
  end.to_json
end

# 施設予約
get '/api/v1/reservation/facility' do
  # sql = "SELECT facility_id, project.name, start_date, end_date FROM facility_reservation INNER JOIN project ON project.id = facility_reservation.project_id"
  schedules = FacilityResercationSchedule.all
  schedules.to_json
end
# 施設予約追加
post '/api/v1/reservation/facility' do
  fid = params[:fid]
  stime = params[:stime]
  etime = params[:etime]
  schedule = FacilityResercationSchedule.new(
    facility_id: fid,
    start_date: stime,
    end_date: etime
  )
  schedule.save
end

# 施設詳細
get '/api/v1/facility' do
  FacilityCategory.all.map do |category|
    facilities = Facility.all.where(category: category.id)
    types = facilities.map { |e| { 'name' => e.name } }
    { 'name' => category.name, 'type' => types }
  end.to_json
end

# 猫の手
get '/api/v1/nekonote' do
  date = Time.now.strftime('%Y-%m-%d %H:%M:%S')
  sql = "SELECT user_id, start_date, end_date FROM nekonote_schedule WHERE start_date <= '#{date}' AND end_date >= '#{date}'"
  ary = select_db(sql)
  ary.to_json
end
# 猫の手救援
get '/api/v1/nekonote/:id' do
  id = params[:id]
  sql = "SELECT name, email FROM user WHERE id = '#{id}'"
  ary = select_db(sql)
  user = ary.first
  Pony.mail(:to => "example@example.com",
              :body => "やばい",
              :subject => "たすけて",
              :from => "#{user[:name]}<#{user[:email]}>",
              :via => :smtp
  )
  {}.to_json
end

get '/api/v1/careful' do
  sql = "SELECT project.name FROM careful_list INNER JOIN project ON project_id = careful_list.project_id"
  ary = select_db(sql)
  ary.to_json
end
post '/api/v1/careful' do
  sql = "INSERT INTO "
end

# 作品リスト
get '/api/v1/projects' do
  sql = "SELECT * FROM project"
  ary = select_db(sql)
  ary.to_json
end
post '/api/v1/projects' do
  # name =
end
