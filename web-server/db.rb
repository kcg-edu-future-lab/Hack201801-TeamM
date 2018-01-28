def connect_db(sql, &block)
  client = Mysql2::Client.new(YAML.load_file('database.yml'))
  result = yield(client, sql)
  client.close
  result
end

def select_db(sql)
  ary = []
  connect_db(sql) do |client, sql|
    client.query(sql).each { |row| ary << row }
  end
  ary
end

def insert_db(sql)
  result = connect_db(sql) do |client, sql|
    client.query(sql)
  end
  result
end
