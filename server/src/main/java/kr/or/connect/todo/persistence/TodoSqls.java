package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	static final String SELECT_BY_ID = 
			"SELECT id, todo, completed, date FROM todo WHERE id= :id";
	static final String SELECT_ALL =
			"SELECT id, todo, completed, date FROM todo ORDER BY id DESC";
	static final String COUNT_NOT_COMPLETED = 
			"SELECT COUNT(*) FROM todo WHERE completed=0";
	static final String UPDATE_BY_ID = 
			"UPDATE todo SET completed= :completed WHERE id= :id";
	static final String DELETE_COMPLETED_ALL = 
			"DELETE FROM todo WHERE completed=1";
}
