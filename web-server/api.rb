require 'pony'

############## API

before do
  headers 'Access-Control-Allow-Origin' => '*'
end
# :useridスケジュール
get '/api/v1/schedule/:id' do
  sql = "SELECT start_date, end_date, name FROM user_schedule WHERE user_id = '#{params[:id]}'"
  # password = 'test'
  # date = Time.now.strftime('%Y-%m-%d %H:%M:%S')
  # sql = "INSERT INTO user (id,name,password_digest,role,create_at,update_at) VALUES ('#{params[:id]}','test', '#{password_digest}', 'PM', '#{date}', '#{date}');"
  ary = select_db(sql)
  ary.to_json
end
# :user_schedule追加
post '/api/v1/schedule/:id' do
  # date = Time.now.strftime('%Y-%m-%d %H:%M:%S')
  stime = params[:stime]
  etime = params[:etime]
  name = params[:name]
  sql = "INSERT INTO user_schedule (user_id,start_date,end_date,name) VALUES('#{params[:id]}', '#{stime}', '#{etime}', '#{name}')"
  insert_db(sql)
end

# 備品予約
get '/api/v1/reservation/equipment' do
  category = params[:category]
  sql = "SELECT equipment.name, project_id, start_date, end_date FROM equipment_reservation INNER JOIN equipment ON equipment.id = equipment_reservation.equipment_id WHERE equipment_id = '#{category}'"
  ary = select_db(sql)
  ary.to_json
end
# 備品予約追加
post '/api/v1/reservation/equipment' do
  eid = params[:eid]
  pid = params[:pid]
  stime = params[:stime]
  etime = params[:etime]
  sql = "INSERT INTO equipment_reservation (equipment_id,project_id,start_date,end_date) VALUES ('#{eid}','#{pid}','#{stime}','#{etime}')"
  insert_db(sql)
end
# 備品一覧
get '/api/v1/category/equipment' do
  sql = "SELECT name FROM equipment_category"
  ary = select_db(sql)
  ary.to_json
end
# 備品詳細
get '/api/v1/equipment' do
  sql = "SELECT id, name FROM equipment WHERE category = '#{params[:category]}'"
  ary = select_db(sql)
  ary.to_json
end

# 施設予約
get '/api/v1/reservation/facility' do
  sql = "SELECT facility_id, project.name, start_date, end_date FROM facility_reservation INNER JOIN project ON project.id = facility_reservation.project_id"
  ary = select_db(sql)
  ary.to_json
end
# 施設予約追加
post '/api/v1/reservation/facility' do
  fid = params[:fid]
  pid = params[:pid]
  stime = params[:stime]
  etime = params[:etime]
  sql = "INSERT INTO facility_reservation (facility_id, project_id, start_date, end_date) VALUES('#{fid}','#{pid}','#{stime}','#{etime}')"
  insert_db(sql)
end
# 施設詳細
get '/api/v1/facility' do
  sql = "SELECT * FROM facility"
  ary = select_db(sql)
  ary.to_json
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
