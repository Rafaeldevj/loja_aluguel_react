package br.com.rafaelvasconcelos.controllers;

import br.com.rafaelvasconcelos.helpers.ModeloCRUD;
import br.com.rafaelvasconcelos.models.Cliente;
import br.com.rafaelvasconcelos.repositorys.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/cliente")
public class ClienteController implements ModeloCRUD<Cliente>, WebMvcConfigurer {

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
    private ClienteRepository clienteRepository;

    @Override
    @GetMapping(SLASH + PATH_LISTAR)
    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    @Override
    @GetMapping(SLASH + PATH_BUSCAR + SLASH + "{id}")
    public Optional<Cliente> buscar(@PathVariable(name = "id") Long id) {
        return clienteRepository.findById(id);
    }

    @Override
    @PostMapping(SLASH + PATH_CADASTRAR)
    public Cliente cadastrar(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Override
    @PutMapping(SLASH + PATH_ATUALIZAR)
    public Cliente atualizar(@RequestBody Cliente cliente) {

        return clienteRepository.save(cliente);
    }

    @Override
    @DeleteMapping(SLASH + PATH_REMOVER + SLASH + "{id}")
    public void remover(@PathVariable(name = "id") Long id) {
        clienteRepository.deleteById(id);
    }
}
