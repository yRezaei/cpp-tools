const cmakefile_txt =
    [
        'cmake_minimum_required (VERSION 3.5)',
        '',
        'set( PROJ_NAME input_project_name )',
        'set( CMAKE_CXX_STANDARD 14 )',
        'set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)',
        'set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)',
        'set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)',
        'SET( PROJ_HEADERS ',
        ')',
        'SET( PROJ_SOURCES ',
        '    ${CMAKE_SOURCE_DIR}/src/main.cpp ',
        ')',
        '',
        'PROJECT( ${PROJ_NAME} CXX )',
        '',
        'include_directories( ${CMAKE_SOURCE_DIR}/include )',
        '',
        'add_executable( ${PROJ_NAME} ${PROJ_SOURCES} )',
        'TARGET_LINK_LIBRARIES( ${PROJ_NAME} )'
    ].join('\n');

const main_cpp =
    [
        '#include <iostream>',
        '',
        'int main(int argc, char** argv)',
        '{',
        '	std::cout << "hello world" << std::endl;',
        '	return 0;',
        '}'
    ].join('\n');

const header_hpp =
    [
        '#ifndef class_name_uppercase_HPP',
        '#define class_name_uppercase_HPP',
        ' ',
        'class class_name',
        '{',
        'class_ctor_dtor',
        '};',
        ' ',
        '#endif // ! class_name_uppercase_HPP',
    ].join('\n');

const class_body =
    [
        'public:',
        '   class_name();',
        '   ~class_name();',
    ].join('\n');

const class_body_inline =
    [
        '  public:',
        '   class_name()',
        '   {',
        '   }',
        '',
        '   ~class_name()',
        '   {',
        '   }',
    ].join('\n');

const source_cpp =
    [
        '#include "file_name.hpp"',
        '',
        'class_name::class_name()',
        '{',
        '}',
        '',
        'class_name::~class_name()',
        '{',
        '}',
    ].join('\n')



module.exports = {
    cmakefile_txt,
    main_cpp,
    header_hpp,
    class_body,
    class_body_inline,
    source_cpp
}
