package amdb.utils.typeHandler;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.util.ArrayList;
import java.util.List;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import amdb.domains.Genre;


public class Genres extends BaseTypeHandler<List<Genre>> {
    @Override
    public List<Genre> getNullableResult(ResultSet resultSet, String column) throws SQLException {
        // return (List<T>) Arrays.asList(resultSet.getString(column).split(","));
        List<Genre> list = new ArrayList<>();

        for (String key: resultSet.getString(column).split(",")) {
            list.add(Genre.valueOf(key));
        }

        return list;
    }

    @Override
    public List<Genre> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        return null;
    }

    @Override
    public List<Genre> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        return null;
    }

	@Override
	public void setNonNullParameter(PreparedStatement preparedStatement, int i, List<Genre> parameter, JdbcType jdbcType) throws SQLException {
		throw new UnsupportedOperationException("Unimplemented method 'setNonNullParameter'");
	}
}
