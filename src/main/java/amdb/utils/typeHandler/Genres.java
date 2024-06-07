package amdb.utils.typeHandler;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.util.ArrayList;
import java.util.List;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class Genres extends BaseTypeHandler<List<String>> {
    @Override
    public List<String> getNullableResult(ResultSet resultSet, String column) throws SQLException {
        List<String> list = new ArrayList<>();

        for (String key: resultSet.getString(column).split(",")) {
            list.add(key);
        }

        return list;
    }

    @Override
    public List<String> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        return null;
    }

    @Override
    public List<String> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        return null;
    }

	@Override
	public void setNonNullParameter(PreparedStatement preparedStatement, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
		throw new UnsupportedOperationException("Unimplemented method 'setNonNullParameter'");
	}
}
