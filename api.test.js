const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;


chai.use(chaiHttp);


describe('Book Api', () => {
    let bookId;

    it('should post a book', (done) => {
        const book = {id: '1', title: 'Test Book', author: 'Test Author'};
        chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('author');
            bookId = res.body.id;
            done();
        })
    });
    
    it('should get all book', (done) => {
        const book = {id: '1', title: 'Test Book', author: 'Test Author'};
        chai.request(server)
        .get('/books')
        .send(book)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            done();
        })
    });

    it('should get a single book', (done) => {
        const book = {id: '1', title: 'Test Book', author: 'Test Author'};
       const bookId = 1
        chai.request(server)
        .get(`/books/${bookId}`)
        .send(book)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('author');
            done();
        })
    });

    it('should update a book', (done) => {
        const updatedBook = {id: '1', title: 'Test New Book', author: 'Test New Author'};
        chai.request(server)
        .put(`/books/${bookId}`)
        .send(updatedBook)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.title).to.equal('Test New Book');
            expect(res.body.author).to.equal('Test New Author');
            done();
        })
    });
 
    it('should return 404 when trying to GET, PUT, DELETE a non-existing book', (done) => {
        chai.request(server)
        .get(`/books/9999`)
        .end((err, res) => {
            expect(res).to.have.status(404);
        });

        chai.request(server)
        .put(`/books/9999`)
        .send({id: '9999', title: 'Non-Existing Book', author: 'Non-Existing Author'})
        .end((err, res) => {
            expect(res).to.have.status(404);
        });
        chai.request(server)
        .delete(`/books/9999`)
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });

    });

})