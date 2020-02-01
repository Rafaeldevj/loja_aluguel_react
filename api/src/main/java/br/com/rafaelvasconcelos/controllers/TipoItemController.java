package br.com.rafaelvasconcelos.controllers;

import br.com.rafaelvasconcelos.helpers.ModeloCRUD;
import br.com.rafaelvasconcelos.models.TipoItem;
import br.com.rafaelvasconcelos.repositorys.TipoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/tipo_item")
public class TipoItemController implements ModeloCRUD<TipoItem>, WebMvcConfigurer {

    private static final String SLASH = "/";
    private static final String PATH_LISTAR = "listar";
    private static final String PATH_BUSCAR = "buscar";
    private static final String PATH_CADASTRAR = "cadastrar";
    private static final String PATH_ATUALIZAR = "atualizar";
    private static final String PATH_REMOVER = "remover";

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
        ;
    }

    @Autowired
    private TipoItemRepository tipoItemRepository;

    @Override
    @GetMapping(SLASH + PATH_LISTAR)
    public List<TipoItem> listar() {
        return tipoItemRepository.findAll();
    }

    @Override
    @GetMapping(SLASH + PATH_BUSCAR + SLASH + "{id}")
    public Optional<TipoItem> buscar(@PathVariable(name = "id") Long id) {
        return tipoItemRepository.findById(id);
    }

    @Override
    @PostMapping(SLASH + PATH_CADASTRAR)
    public TipoItem cadastrar(@RequestBody TipoItem tipoItem) {
        return tipoItemRepository.save(tipoItem);
    }

    @Override
    @PutMapping(SLASH + PATH_ATUALIZAR)
    public TipoItem atualizar(@RequestBody TipoItem tipoItem) {
        return tipoItemRepository.save(tipoItem);
    }

    @Override
    @DeleteMapping(SLASH + PATH_REMOVER + SLASH + "{id}")
    public void remover(@PathVariable(name = "id") Long id) {
        tipoItemRepository.deleteById(id);
    }
}
