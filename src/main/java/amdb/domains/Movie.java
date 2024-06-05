package amdb.domains;

import java.util.List;
import javax.ws.rs.WebApplicationException;


public class Movie {
    public int id;
    public String title;
    public String director;
    public String summary;
    public List<Genre> genres;

    public Movie() {
        super();
    }

    public Movie(int id, String title, String director, String summary, List<Genre> genres) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.summary = summary;
        this.genres = genres;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return this.title;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getDirector() {
        return this.director;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSummary() {
        return this.summary;
    }

    public void addGenre(Genre genre) {
        this.genres.add(genre);
    }

    public void removeGenre(int index) {
        this.genres.remove(index);
    }

    public List<Genre> getGenres() {
        return this.genres;
    }

    public void validate() throws Exception {
        if (this.title == null) {
            throw new WebApplicationException("title field is required", 400);
        }

        if (this.director == null) {
            throw new WebApplicationException("director field is required", 400);
        }

        if (this.summary == null) {
            throw new WebApplicationException("summary field is required", 400);
        }

        if (this.genres == null) {
            throw new WebApplicationException("genres field is required", 400);
        }
    }
}
