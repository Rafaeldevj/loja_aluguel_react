package br.com.rafaelvasconcelos.controllers;

import br.com.rafaelvasconcelos.helpers.ModeloCRUD;
import br.com.rafaelvasconcelos.models.Item;
import br.com.rafaelvasconcelos.models.TipoItem;
import br.com.rafaelvasconcelos.repositorys.ItemRepository;
import br.com.rafaelvasconcelos.repositorys.TipoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/item")
public class ItemController implements ModeloCRUD<Item>, WebMvcConfigurer {

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
    private ItemRepository itemRepository;

    @Autowired
    private TipoItemRepository tipoItemRepository;

    @Override
    @GetMapping(SLASH + PATH_LISTAR)
    public List<Item> listar() {

        return itemRepository.findAll(Sort.by(Sort.Direction.ASC, "nome"));
    }

    @Override
    @GetMapping(SLASH + PATH_BUSCAR + SLASH + "{id}")
    public Optional<Item> buscar(@PathVariable(name = "id") Long id) {
        return itemRepository.findById(id);
    }

    @Override
    @PostMapping(SLASH + PATH_CADASTRAR)
    public Item cadastrar(@RequestBody Item item) {
        item.setDisponivel("S");
        return itemRepository.save(item);
    }

    @Override
    @PutMapping(SLASH + PATH_ATUALIZAR)
    public Item atualizar(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @Override
    @DeleteMapping(SLASH + PATH_REMOVER + SLASH + "{id}")
    public void remover(@PathVariable(name = "id") Long id) {
        itemRepository.deleteById(id);
    }
}
