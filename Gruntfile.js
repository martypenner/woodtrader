module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'lib/game/src/',
                        src: ['**/*.js'],
                        dest: 'lib/game/',
                        ext: '.js'
                    }
                ]
            }
        },
        watch: {
            coffee: {
                files: ['lib/game/src/**/*.coffee'],
                tasks: ['coffee']
            },
            js: {
                files: ['lib/game/src/**/*.js'],
                tasks: ['uglify:js']
            }
        },
        coffee: {
            options: {
                sourceMap: true,
                bare: true
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'lib/game/src/',
                        src: ['**/*.coffee'],
                        dest: 'lib/game/',
                        ext: '.js'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['coffee', 'uglify:js']);

};