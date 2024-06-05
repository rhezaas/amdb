package amdb.domains.repositories;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Delete;

import io.quarkiverse.mybatis.runtime.meta.MapperDataSource;


@Mapper
@MapperDataSource("write")
public interface Command {
    @Insert({
        "<script>" +
            "INSERT INTO movie(title, director, summary, genres) VALUES " +
            "(#{title}, #{director}, #{summary}, #{genres})" +
        "</script>"
    })
    void addMovie(
        @Param("title")     String title,
        @Param("director")  String director,
        @Param("summary")   String summary,
        @Param("genres")    String genres
    );

    @Update({
        "<script>" +
            "UPDATE movie SET " +
                "<if test='title != null'>title = #{title}, </if>" +
                "<if test='director != null'>director = #{director}, </if>" +
                "<if test='summary != null'>summary = #{summary}, </if>" +
                "<if test='genres != null'>genres = #{genres}, </if>" +
                "id = id " +
            "WHERE id = #{id}" +
        "</script>"
    })
    void updateMovie(
        @Param("id")        int id,
        @Param("title")     String title,
        @Param("director")  String director,
        @Param("summary")   String summary,
        @Param("genres")    String genres
    );

    @Delete("DELETE FROM movie WHERE id = #{id}")
    void deleteMovie(int id);
}
