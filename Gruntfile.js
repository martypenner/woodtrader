module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:   {
                src:  'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        coffee: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'lib/src/',
                    src: ['**/*.coffee'],
                    dest: 'lib/game/',
                    ext: '.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['coffee']);

};