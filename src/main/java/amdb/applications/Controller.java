package amdb.applications;

import java.util.Map;
import java.util.HashMap;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import amdb.domains.Movie;
import amdb.domains.repositories.Command;
import amdb.domains.repositories.Query;


@Path("/movie")
@ApplicationScoped
public class Controller {
    @Inject Command command;
    @Inject Query query;

    @POST
    public Response AddMovie(Movie movie) {
        Map<String, Object> resp = new HashMap<String, Object>();

        try {
            movie.validate();
            command.addMovie(
                movie.getTitle(),
                movie.getDirector(),
                movie.getSummary(),
                String.join(",", movie.getGenres().toString()).replaceAll("[\\[\\] ]", "")
            );

            resp.put("message", "Succeed");
            return Response
                .status(202)
                .entity(resp)
                .build();
        } catch (WebApplicationException e) {
            resp.put("message", e.getMessage());

            return Response
                .status(e.getResponse().getStatus())
                .entity(resp)
                .build();
        } catch (Exception e) {
            resp.put("message", e.getMessage());

            return Response
                .status(500)
                .entity(resp)
                .build();
        }
    }

    @GET
    public Response GetMovies() {
        try {
            return Response
                .ok(query.getList())
                .build();
        } catch (WebApplicationException e) {
            Map<String, Object> resp = new HashMap<String, Object>();
            resp.put("message", e.getMessage());

            return Response
                .status(e.getResponse().getStatus())
                .entity(resp)
                .build();
        } catch (Exception e) {
            Map<String, Object> resp = new HashMap<String, Object>();
            resp.put("message", e.getMessage());

            return Response
                .status(500)
                .entity(resp)
                .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response GetMovie(int id) {
        try {
            Movie movie = query.getById(id);
            if (movie == null) {
                throw new WebApplicationException("Movie not found", 404);
            }

            return Response.ok(movie).build();
        } catch (WebApplicationException e) {
            Map<String, Object> resp = new HashMap<String, Object>();
            resp.put("message", e.getMessage());

            return Response
                .status(e.getResponse().getStatus())
                .entity(resp)
                .build();
        } catch (Exception e) {
            Map<String, Object> resp = new HashMap<String, Object>();
            resp.put("message", e.getMessage());

            return Response
                .status(500)
                .entity(resp)
                .build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateMovie(int id, Movie movie) {
        Map<String, Object> resp = new HashMap<String, Object>();

        try {
            command.updateMovie(id,
                movie.getTitle(),
                movie.getDirector(),
                movie.getSummary(),
                (movie.getGenres() != null 
                    ? String.join(",", movie.getGenres().toString().replaceAll("[\\[\\] ]", ""))
                    : null)
            );

            resp.put("message", "Succeed");
            return Response
                .status(202)
                .entity(resp)
                .build();
        } catch (WebApplicationException e) {
            resp.put("message", e.getMessage());

            return Response
                .status(e.getResponse().getStatus())
                .entity(resp)
                .build();
        } catch (Exception e) {
            resp.put("message", e.getMessage().split("\n###"));

            return Response
                .status(500)
                .entity(resp)
                .build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Object deleteMovie(int id) {
        Map<String, Object> resp = new HashMap<String, Object>();

        try {
            command.deleteMovie(id);

            resp.put("message", "Succeed");
            return Response
                .status(202)
                .entity(resp)
                .build();
        } catch (WebApplicationException e) {
            resp.put("message", e.getMessage());

            return Response
                .status(e.getResponse().getStatus())
                .entity(resp)
                .build();
        } catch (Exception e) {
            resp.put("message", e.getMessage());

            return Response
                .status(500)
                .entity(resp)
                .build();
        }
    }
}
