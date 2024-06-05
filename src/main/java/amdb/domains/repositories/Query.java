package amdb.domains.repositories;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;

import io.quarkiverse.mybatis.runtime.meta.MapperDataSource;

import amdb.domains.Movie;


@Mapper
@MapperDataSource("read")
public interface Query {

    @Select("SELECT * FROM movie")
    @ResultMap("amdb.utils.Mapper.movieResult")
    List<Movie> getList();

    @Select("SELECT * FROM movie WHERE id = #{id}")
    @ResultMap("amdb.utils.Mapper.movieResult")
    Movie getById(int id);
}
